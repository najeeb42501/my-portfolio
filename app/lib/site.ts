// Set SITE_URL to the final public origin before deploying.
export const siteUrl = (process.env.SITE_URL || "https://njb.dev").replace(
  /\/$/,
  "",
);
export const siteDescription =
  "Najeeb Ullah Khan is a software engineer building thoughtful React and Next.js interfaces, enterprise platforms, and AI experiences. Explore selected projects and get in touch.";
