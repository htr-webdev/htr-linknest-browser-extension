
# LinkNest

**A simple, organized home for your links.**

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Status](https://img.shields.io/badge/status-in%20development-orange)
![License](https://img.shields.io/badge/license-MIT-green)

LinkNest is a lightweight, local-first browser extension for saving, managing, and organizing links. It is being developed for users who want quick access to their saved links without relying on an account or cloud service.

## Current Features

- Add links with a title and URL.
- Edit existing links.
- Delete links with confirmation.
- Validate URLs and normalize them to HTTP or HTTPS.
- Search saved links by title or URL.
- Automatically save links using local browser storage.
- Restore saved links when the popup is reopened.

## Planned Features

- Organize links into collections and folders.
- Move links between folders.
- Add notes to saved links.
- Customize collection and folder colors.
- Open all links in a folder.
- Provide a dedicated management page.
- Add a settings page for extension preferences.

## Browser Support

- Google Chrome
- Mozilla Firefox

The popup interface and current link management and storage features have been tested in both browsers.

## Technology

LinkNest is built with standard web technologies and browser extension APIs.

- HTML
- CSS
- JavaScript
- WebExtensions API
- Browser local storage

The project does not currently use a frontend framework.

## Installation for Development

### Google Chrome

1. Clone or download this repository.
2. Open `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project directory containing `manifest.json`.

### Mozilla Firefox

1. Clone or download this repository.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**.
4. Select the project's `manifest.json` file.

Click the LinkNest extension icon to open the popup.

## Project Status

LinkNest is under active development. The current implementation supports basic link management and local persistence. Folder organization, notes, customization, and the dedicated management interface are planned for upcoming development stages.

## Privacy

LinkNest is designed around local-first storage. Saved links are stored in the browser's local storage, and the current implementation does not require an account or cloud service.

## License

This project is released under the [MIT License](LICENSE).
