/**
 * WA Blur - lib/storage.js
 * localStorage abstraction with error handling.
 */
(function () {
  "use strict";

  window.__waBlur = window.__waBlur || {};

  window.__waBlur.storage = {
    get: function (key, fallback) {
      try {
        var val = localStorage.getItem(key);
        return val === null ? fallback : val;
      } catch (e) {
        return fallback;
      }
    },

    set: function (key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        // silently fail
      }
    }
  };
})();
