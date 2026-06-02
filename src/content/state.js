/**
 * WA Blur - content/state.js
 * Core state management: persistence + body class toggle.
 */
(function () {
  "use strict";

  var blur = window.__waBlur;

  blur.isEnabled = true;

  blur.loadState = function () {
    var saved = blur.storage.get(blur.STORAGE_KEY, null);
    blur.isEnabled = saved === null ? true : saved === "true";
    blur.applyState();
  };

  blur.applyState = function () {
    if (blur.isEnabled) {
      document.body.classList.remove("wa-blur-disabled");
    } else {
      document.body.classList.add("wa-blur-disabled");
    }
  };

  blur.toggleBlur = function () {
    blur.isEnabled = !blur.isEnabled;
    blur.storage.set(blur.STORAGE_KEY, String(blur.isEnabled));
    blur.applyState();
    return blur.isEnabled;
  };
})();
