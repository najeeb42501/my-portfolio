"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function Toaster() {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    let timer = 0;
    const onToast = (event: Event) => {
      const text = (event as CustomEvent<string>).detail;
      setMessage({ id: Date.now(), text });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2200);
    };
    window.addEventListener("app:toast", onToast);
    return () => {
      window.removeEventListener("app:toast", onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite">
      <AnimatePresence>
        {message ? (
          <motion.div
            key={message.id}
            className="toast"
            initial={{ opacity: 0, y: 12, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 8, x: "-50%" }}
            transition={{ duration: 0.3 }}
          >
            <FiCheck aria-hidden /> {message.text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
