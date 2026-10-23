# LinkNest

**A simple, organized home for your links.**

**Version:** 0.1.0  
**Status:** In Development

LinkNest is a browser extension for saving, organizing, and quickly accessing links.

## Features

Planned for the initial release:

- Organize links into collections and folders.
- Add, edit, and delete links.
- Add notes to links.
- Search saved links.
- Open all links in a folder.
- Customize collection and folder colors.
- Save changes automatically.
- Store data locally without an account.

## Browser Support

- Google Chrome
- Mozilla Firefox

Initial loading tests have passed in both browsers.

## Development

LinkNest is being developed using standard web technologies and the browser extension platform, without a frontend framework.

### Load in Chrome

1. Open `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the project folder containing `manifest.json`.

### Load in Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select the project's `manifest.json` file.

Click the extension icon to open the popup.

**Current state:** The popup is a basic test page. Link management features are not implemented yet.

## Privacy

The planned MVP stores saved links locally in the browser. No account or cloud service is required.

## License

Released under the [MIT License](LICENSE).
