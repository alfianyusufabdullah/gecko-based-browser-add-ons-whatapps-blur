/**
 * WA Blur - content/ipc.js
 * window.postMessage bridge: popup <-> page context.
 */
(function () {
  "use strict";

  var blur = window.__waBlur;
  var MSG = blur.MSG;

  window.addEventListener("message", function (event) {
    if (event.source !== window) return;
    var data = event.data;
    if (!data) return;

    if (data.type === MSG.TOGGLE) {
      var newState = blur.toggleBlur();
      window.postMessage({ type: MSG.STATE, enabled: newState }, "*");
    }

    if (data.type === MSG.GET_STATE) {
      window.postMessage({
        type: MSG.STATE,
        enabled: blur.isEnabled,
        level: blur.blurLevel
      }, "*");
    }

    if (data.type === MSG.SET_LEVEL) {
      var newLevel = blur.setLevel(data.level);
      window.postMessage({ type: MSG.LEVEL, level: newLevel }, "*");
    }

    if (data.type === MSG.GET_LEVEL) {
      window.postMessage({ type: MSG.LEVEL, level: blur.blurLevel }, "*");
    }
  });
})();
