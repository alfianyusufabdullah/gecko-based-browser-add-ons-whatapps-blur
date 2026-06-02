/**
 * WA Blur - config/blur-targets.js
 * Define all elements to blur. Just add an entry here to blur a new component.
 *
 * Structure:
 *   container  -> the parent element that triggers unblur on hover
 *   children[] -> elements inside container to blur
 *     selector -> CSS selector
 *     ratio    -> blur multiplier relative to main level (1.0 = same as slider)
 */
(function () {
  "use strict";

  window.__waBlur.BLUR_TARGETS = [
    {
      container: '[data-testid="msg-container"]',
      children: [
        { selector: '[data-testid="msg-container"]', ratio: 1.0 },
        { selector: '[data-testid="author"]',          ratio: 0.83 },
        { selector: '[data-testid="quoted-message"]',  ratio: 0.67 },
        { selector: '[data-testid="sticker-container"]', ratio: 1.33 },
        { selector: '[data-testid="conversation-info-header-chat-title"]', ratio: 1.33 },
        { selector: '[data-testid="cell-frame-title"]', ratio: 1.33 }
      ]
    },
    {
      container: '[data-testid="chat-list"]',
      children: [
        { selector: '[data-testid="conversation-info-header-chat-title"]', ratio: 1 },
        { selector: '[data-testid="cell-frame-title"]', ratio: 1.33 },
        { selector: '[data-testid="cell-frame-secondary"]', ratio: 1.33}
      ]
    }
  ];
})();
