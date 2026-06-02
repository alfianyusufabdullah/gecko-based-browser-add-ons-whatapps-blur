/**
 * WA Blur - config/constants.js
 * Shared constants: storage keys, message types, defaults.
 */
(function () {
  "use strict";

  window.__waBlur = window.__waBlur || {};

  window.__waBlur.STORAGE_KEY = "wa_blur_enabled";
  window.__waBlur.LEVEL_KEY = "wa_blur_level";
  window.__waBlur.DEFAULT_LEVEL = 6;

  window.__waBlur.MSG = {
    TOGGLE: "WA_BLUR_TOGGLE",
    GET_STATE: "WA_BLUR_GET_STATE",
    STATE: "WA_BLUR_STATE",
    SET_LEVEL: "WA_BLUR_SET_LEVEL",
    GET_LEVEL: "WA_BLUR_GET_LEVEL",
    LEVEL: "WA_BLUR_LEVEL"
  };
})();
