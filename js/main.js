/**
 * Hide elfsight link
 */

function applyStyles(links) {
  links.forEach((link) => {
    link.style.setProperty("visibility", "hidden", "important");
  });
}

function startObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('a[href^="https://elfsight"]')) {
              applyStyles([node]);
            }
            const links =
              node.querySelectorAll &&
              node.querySelectorAll('a[href^="https://elfsight"]');
            if (links && links.length > 0) {
              applyStyles(links);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver);
} else {
  startObserver();
}
