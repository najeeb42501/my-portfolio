import { spawn } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";

// Browser smoke checks against a running local production server. No messages
// are sent: contact checks only exercise rejected or honeypot payloads.
const origin = process.env.CHECK_URL || "http://localhost:3010";
const directory = resolve(".artifacts/portfolio");
await mkdir(directory, { recursive: true });
const browserProfile = await mkdtemp(resolve(".artifacts/chrome-profile-"));
const browser = spawn(
  process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=9228",
    `--user-data-dir=${browserProfile}`,
    "--window-size=1440,1000",
    "about:blank",
  ],
  { windowsHide: true, stdio: "ignore" },
);
let socket;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  let tab;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      tab = await (
        await fetch("http://127.0.0.1:9228/json/new?about:blank", {
          method: "PUT",
        })
      ).json();
      break;
    } catch {
      await delay(250);
    }
  }
  assert(tab, "Headless Chrome started");
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  let id = 0;
  const pending = new Map();
  const errors = [];
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown")
      errors.push(
        message.params.exceptionDetails.text +
          ": " +
          (message.params.exceptionDetails.exception?.description || ""),
      );
    if (pending.has(message.id)) {
      const { resolve, reject, timeout } = pending.get(message.id);
      clearTimeout(timeout);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const key = ++id;
      const timeout = setTimeout(() => {
        pending.delete(key);
        reject(new Error(`Timed out: ${method}`));
      }, 30000);
      pending.set(key, { resolve, reject, timeout });
      socket.send(JSON.stringify({ id: key, method, params }));
    });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails)
      throw new Error(
        result.exceptionDetails.exception?.description || "Evaluation failed",
      );
    return result.result.value;
  };
  const screenshot = async (name) => {
    const { data } = await send("Page.captureScreenshot", { format: "png" });
    await writeFile(
      resolve(directory, `${name}.png`),
      Buffer.from(data, "base64"),
    );
  };
  const waitFor = async (expression) => {
    for (let i = 0; i < 100; i++) {
      if (await evaluate(expression)) return;
      await delay(150);
    }
    throw new Error(`Condition not met: ${expression}`);
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.addScriptToEvaluateOnNewDocument", {
    source: `window.__vitals={cls:0,lcp:0}; new PerformanceObserver(list=>{for(const e of list.getEntries()) if(!e.hadRecentInput) window.__vitals.cls+=e.value}).observe({type:'layout-shift',buffered:true}); new PerformanceObserver(list=>{for(const e of list.getEntries())window.__vitals.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});`,
  });
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: origin });
  await waitFor(
    `document.querySelectorAll('.project-card').length===8 && document.querySelector('.lock-portrait img')?.complete`,
  );
  await delay(1000);
  assert.equal(await evaluate(`document.querySelectorAll('h1').length`), 1);
  assert.equal(
    await evaluate(`document.querySelectorAll('.work-tile').length`),
    3,
  );
  assert.equal(
    await evaluate(`document.querySelectorAll('#experience article').length`),
    4,
  );
  assert.equal(
    await evaluate(`document.querySelector('link[rel=canonical]')?.href`),
    await evaluate(
      `new URL(JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).url).href`,
    ),
  );
  console.log("Initial local lab metrics:", await evaluate("window.__vitals"));

  for (const width of [1440, 1024, 768, 375]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    await delay(500);
    assert(
      await evaluate("document.documentElement.scrollWidth <= innerWidth"),
      `No horizontal overflow at ${width}px`,
    );
    await screenshot(`hero-${width}`);
    if (width === 375) {
      assert.equal(
        await evaluate(
          `getComputedStyle(document.querySelector('.lock-portrait')).position`,
        ),
        "relative",
        "Lock screen stacks into one column",
      );
      await evaluate(`document.querySelector('.mobile-menu-button').click()`);
      assert.equal(
        await evaluate(
          `document.querySelector('.mobile-menu-button').getAttribute('aria-expanded')`,
        ),
        "true",
      );
      await evaluate(
        `document.querySelector('#mobile-navigation a[href="#work"]').click()`,
      );
      assert.equal(
        await evaluate(
          `document.querySelector('.mobile-menu-button').getAttribute('aria-expanded')`,
        ),
        "false",
      );
    }
    await evaluate(
      `document.querySelector('#projects').scrollIntoView({behavior:'instant'})`,
    );
    await delay(500);
    await waitFor(
      `Array.from(document.querySelectorAll('.project-preview img')).slice(0,2).every(img=>img.complete && img.naturalWidth>0)`,
    );
    await screenshot(`projects-${width}`);
  }
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  for (const [filter, expected] of [
    ["Platforms", 5],
    ["AI", 1],
    ["Websites", 2],
    ["All", 8],
  ]) {
    await evaluate(
      `Array.from(document.querySelectorAll('#projects .segmented button')).find(b=>b.textContent==='${filter}').click()`,
    );
    await waitFor(
      `document.querySelectorAll('.project-card').length===${expected}`,
    );
  }
  await evaluate(
    `document.querySelector('.project-preview').focus(); document.querySelector('.project-preview').click()`,
  );
  await waitFor(`document.querySelector('dialog')?.open`);
  assert.equal(await evaluate("document.body.style.overflow"), "hidden");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "ArrowRight",
    code: "ArrowRight",
    windowsVirtualKeyCode: 39,
  });
  await waitFor(
    `document.querySelector('.dialog-gallery-controls [role=status]').textContent.startsWith('02')`,
  );
  await screenshot("project-dialog");
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await waitFor(`!document.querySelector('dialog')`);
  assert.equal(
    await evaluate(
      `document.activeElement.classList.contains('project-preview')`,
    ),
    true,
    "Focus restored",
  );
  assert.notEqual(await evaluate("document.body.style.overflow"), "hidden");

  await evaluate(
    `document.querySelector('.header-actions button').click(); window.scrollTo({top:0,behavior:'instant'})`,
  );
  await delay(250);
  assert.equal(
    await evaluate("document.documentElement.dataset.theme"),
    "dark",
  );
  await screenshot("hero-dark");
  await evaluate(
    `document.querySelector('#projects').scrollIntoView({behavior:'instant'})`,
  );
  await delay(300);
  await screenshot("projects-dark");
  await evaluate(`document.querySelector('.header-actions button').click()`);

  for (let index = 0; index < 3; index++) {
    await evaluate(
      `document.querySelectorAll('.work-dots button')[${index}].click()`,
    );
    await delay(1200);
    assert.equal(
      await evaluate(
        `document.querySelectorAll('.work-dots button')[${index}].getAttribute('aria-pressed')`,
      ),
      "true",
    );
    await waitFor(
      `document.querySelectorAll('.work-tile img')[${index}].naturalWidth>0`,
    );
    await screenshot(`work-${index + 1}`);
  }

  // Lock screen: a notification opens to reveal its actions, and the portrait travels on scroll.
  await evaluate('window.scrollTo({top:0,behavior:"instant"})');
  await delay(300);
  await evaluate(`document.querySelector('.lock-note-head').click()`);
  await waitFor(
    `document.querySelector('.lock-note-head').getAttribute('aria-expanded')==='true' && !document.querySelector('.lock-note-actions').inert`,
  );
  await evaluate('window.scrollTo({top:400,behavior:"instant"})');
  await delay(400);
  assert.notEqual(
    await evaluate(`document.querySelector('.lock-portrait').style.transform`),
    "",
    "Portrait moves toward About on scroll",
  );

  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await delay(400);
  assert.equal(
    await evaluate(`document.querySelector('.lock-portrait').style.transform`),
    "",
    "Reduced motion keeps the portrait still",
  );
  assert.equal(
    await evaluate(`getComputedStyle(document.querySelector('.about-still')).display`),
    "block",
    "Reduced motion shows the About photo in place",
  );

  // Contact: an incomplete message is held back with a hint, and nothing is sent.
  await evaluate(
    `document.querySelector('#contact').scrollIntoView({behavior:'instant'}); document.querySelector('.chat-send').click()`,
  );
  await waitFor(`!!document.querySelector('.chat-hint[data-warn]')`);
  assert.equal(await evaluate(`document.querySelectorAll('.bubble.is-out').length`), 0);
  await delay(300);
  await screenshot("contact");

  for (const [payload, expected] of [
    [null, 400],
    [{ name: "", email: "", message: "" }, 400],
    [{ website: "spam" }, 200],
  ]) {
    assert.equal(
      (
        await fetch(`${origin}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      ).status,
      expected,
    );
  }
  for (const path of ["/robots.txt", "/sitemap.xml", "/opengraph-image"])
    assert.equal((await fetch(origin + path)).status, 200, path);
  assert.deepEqual(errors, [], "No browser runtime exceptions");
  console.log(
    "PASS: responsive layouts, lock screen, project filters, modal/keyboard/focus, theme, work carousel, reduced motion, metadata routes, contact validation.",
  );
  console.log(`Screenshots: ${directory}`);
  socket.send(JSON.stringify({ id: ++id, method: "Browser.close" }));
} finally {
  socket?.close();
  browser.kill();
}
process.exit(0);
