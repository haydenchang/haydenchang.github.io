function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.94 8.5v9.25H3.86V8.5zm.2-2.86a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0m13 6.8v5.3h-3.08v-4.95c0-1.18-.42-1.99-1.47-1.99-.8 0-1.28.54-1.49 1.07-.08.19-.1.46-.1.74v5.12h-3.08v-6.3c0-1.16-.04-2.13-.08-2.95h2.68l.14 1.28h.06c.38-.6 1.3-1.47 2.83-1.47 1.88 0 3.3 1.23 3.3 3.9"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.69-.22.69-.49v-1.71c-2.8.61-3.39-1.19-3.39-1.19-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.04 1.56 1.04.9 1.56 2.37 1.11 2.95.86.09-.66.36-1.11.65-1.36-2.24-.26-4.6-1.11-4.6-4.95 0-1.1.39-2 1.03-2.71-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.9-1.3 2.74-1.03 2.74-1.03.56 1.41.21 2.45.11 2.71.64.71 1.02 1.61 1.02 2.71 0 3.85-2.36 4.68-4.61 4.94.36.31.69.91.69 1.84V21c0 .27.18.59.69.49A10 10 0 0 0 12 2"
      />
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <div className="social-links-floating" aria-label="Social links">
      <a
        href="https://www.linkedin.com/in/hyunseo-hayden-chang/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open LinkedIn profile in new tab"
      >
        <LinkedInIcon />
      </a>
      <a
        href="https://github.com/haydenchang"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile in new tab"
      >
        <GitHubIcon />
      </a>
    </div>
  );
}
