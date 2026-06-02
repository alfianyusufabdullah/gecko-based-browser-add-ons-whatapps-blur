/**
 * WA Blur - content/level.js
 * Injects a static stylesheet once using CSS calc(var(--wa-blur-level)).
 * Level changes only update a single CSS variable — zero CSS rebuild.
 */
(function () {
  "use strict";

  var blur = window.__waBlur;

  blur.blurLevel = blur.DEFAULT_LEVEL;

  // -- Build static stylesheet once --
  blur.buildStyleSheet = function () {
    var targets = blur.BLUR_TARGETS;
    var css = '';
    var uniqueSelectors = [];

    // Deduplicated blur rules using CSS calc(level * ratio)
    var seen = {};
    for (var i = 0; i < targets.length; i++) {
      for (var j = 0; j < targets[i].children.length; j++) {
        var child = targets[i].children[j];
        if (seen[child.selector]) continue;
        seen[child.selector] = true;
        uniqueSelectors.push(child.selector);

        css += child.selector +
          '{filter:blur(calc(var(--wa-blur-level,6)*' + child.ratio + 'px));' +
          'user-select:none;}';
      }
    }

    // Hover unblur (direct + container)
    var hoverSeen = {};
    for (var i = 0; i < targets.length; i++) {
      var group = targets[i];
      var hasContainer = !!group.container;

      if (hasContainer) {
        css += group.container + ':hover{filter:blur(0px)!important;user-select:text!important;}';
      }

      for (var j = 0; j < group.children.length; j++) {
        var sel = group.children[j].selector;

        if (!hoverSeen[sel]) {
          hoverSeen[sel] = true;
          css += sel + ':hover{filter:blur(0px)!important;user-select:text!important;}';
        }

        if (hasContainer) {
          css += group.container + ':hover ' + sel + '{filter:blur(0px)!important;user-select:text!important;}';
        }
      }
    }

    // Disabled state override
    css += 'body.wa-blur-disabled ' +
      uniqueSelectors.join(',body.wa-blur-disabled ') +
      '{filter:blur(0px)!important;user-select:text!important;}';

    // Transition on hover only (applied once globally)
    css += 'body:not(.wa-blur-disabled) ' +
      uniqueSelectors.join(',body:not(.wa-blur-disabled) ') +
      '{transition:filter .15s ease-in-out;}';

    blur._styleEl = document.createElement('style');
    blur._styleEl.id = 'wa-blur-dynamic';
    blur._styleEl.textContent = css;
    document.head.appendChild(blur._styleEl);
  };

  // -- Load persisted level + apply CSS var --
  blur.loadLevel = function () {
    var saved = blur.storage.get(blur.LEVEL_KEY, null);
    blur.blurLevel = saved !== null ? parseInt(saved, 10) : blur.DEFAULT_LEVEL;
    blur.applyLevel();
  };

  // -- Set level (slider callback) --
  blur.setLevel = function (level) {
    level = Math.max(0, Math.min(20, parseInt(level, 10) || 0));
    blur.blurLevel = level;
    blur.storage.set(blur.LEVEL_KEY, String(level));
    blur.applyLevel();
    return level;
  };

  // -- Apply level: update single CSS variable (no stylesheet rebuild) --
  blur.applyLevel = function () {
    document.documentElement.style.setProperty('--wa-blur-level', blur.blurLevel);
  };
})();
