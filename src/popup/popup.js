/**
 * WA Blur - popup.js
 * Toolbar popup: toggle on/off + blur level slider.
 */
var toggle = document.getElementById("toggleBlur");
var slider = document.getElementById("blurLevel");
var levelVal = document.getElementById("levelValue");

var TOGGLE_KEY = "wa_blur_enabled";
var LEVEL_KEY = "wa_blur_level";
var DEFAULT_LEVEL = 6;

// -- Load current state on open --
browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
  var tab = tabs[0];
  if (!tab) return;

  browser.tabs.executeScript(tab.id, {
    code: "JSON.stringify({" +
      "enabled: localStorage.getItem('" + TOGGLE_KEY + "')," +
      "level: localStorage.getItem('" + LEVEL_KEY + "')" +
      "})"
  }).then(function (results) {
    var state;
    try { state = JSON.parse(results[0]); } catch (e) { state = {}; }

    toggle.checked = state.enabled === null ? true : state.enabled === "true";

    var lvl = state.level !== null ? parseInt(state.level, 10) : DEFAULT_LEVEL;
    slider.value = lvl;
    levelVal.textContent = lvl;
  }).catch(function () {
    toggle.checked = true;
    slider.value = DEFAULT_LEVEL;
    levelVal.textContent = DEFAULT_LEVEL;
  });
});

// -- Toggle on/off --
toggle.addEventListener("change", function () {
  browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
    var tab = tabs[0];
    if (!tab) return;

    browser.tabs.executeScript(tab.id, {
      code: "window.postMessage({ type: 'WA_BLUR_TOGGLE' }, '*')"
    }).catch(console.error);
  });
});

// -- Blur level slider --
slider.addEventListener("input", function () {
  var val = slider.value;
  levelVal.textContent = val;
});

slider.addEventListener("change", function () {
  var val = parseInt(slider.value, 10);

  browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
    var tab = tabs[0];
    if (!tab) return;

    browser.tabs.executeScript(tab.id, {
      code: "window.postMessage({ type: 'WA_BLUR_SET_LEVEL', level: " + val + " }, '*')"
    }).catch(console.error);
  });
});
