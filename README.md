# WA Blur

Firefox/Zen Browser add-on that blurs WhatsApp Web messages by default. Messages only reveal on hover — ideal for public spaces or screen sharing.

## Features

- Auto blur messages, contact names, quoted messages, and stickers
- Hover to reveal — move cursor over a message to read it
- Toggle on/off via toolbar popup
- Adjustable blur intensity (0–20) via slider
- Persistent state (localStorage)

## Structure

```
wa-blur/
├── manifest.json
├── package.json
├── docs/PRD_WhatsApp_Blur_Addon.md
└── src/
    ├── config/
    │   ├── constants.js        # Storage keys, message types
    │   └── blur-targets.js     # Blur target definitions
    ├── lib/
    │   └── storage.js          # localStorage wrapper
    ├── content/
    │   ├── state.js            # Toggle state + body class
    │   ├── level.js            # Blur intensity + dynamic CSS
    │   ├── ipc.js              # postMessage bridge
    │   └── index.js            # Entry point
    ├── popup/
    │   ├── popup.html          # Toolbar popup UI
    │   └── popup.js            # Popup logic
    └── assets/icons/
```

## Adding Blur Targets

Edit `src/config/blur-targets.js`, add an entry:

```js
window.__waBlur.BLUR_TARGETS = [
  // Group with container: hover container -> unblur all children
  {
    container: '[data-testid="msg-container"]',
    children: [
      { selector: '[data-testid="msg-container"]', ratio: 1.0 }
    ]
  },
  // Group without container: each child unblurs independently
  {
    children: [
      { selector: '.new-target', ratio: 1.0 }
    ]
  }
];
```

- `selector` — CSS selector of the element to blur
- `ratio` — blur multiplier (1.0 = same as slider value)
- `container` — optional, hover container unblurs all children

## Development

### Prerequisites

- Node.js + npm
- Zen Browser (Flatpak) or Firefox

### Flatpak Setup (Zen Browser)

```bash
flatpak override --user --filesystem="$(pwd)" app.zen_browser.zen
```

### Install & Run

```bash
npm install
npm run lint       # Validate extension
npm run build      # Build .zip
npm run dev        # Run in Firefox
npm run dev:zen    # Run in Zen Browser (Flatpak)
```

### Load Temporary Add-on

1. Open `about:debugging` > "This Firefox"
2. "Load Temporary Add-on" > select `manifest.json`

## Notes

- WhatsApp may change `data-testid` attributes over time
- Gecko-based browsers only (Firefox, Zen, LibreWolf)
