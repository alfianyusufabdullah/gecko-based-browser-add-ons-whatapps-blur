/**
 * WA Blur - content/index.js
 * Entry point. Injects stylesheet, loads state, starts IPC.
 */
(function () {
  "use strict";

  var blur = window.__waBlur;

  function init() {
    blur.buildStyleSheet();
    blur.loadState();
    blur.loadLevel();
    console.log("[WA Blur] Initialized. Blur:", blur.isEnabled, "Level:", blur.blurLevel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
