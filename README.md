# Flow Chat for YouTube Live Fix

[日本語版 README](README.ja.md)

This repository is a fork of
[subdiox/youtube-live-chat-flow](https://github.com/subdiox/youtube-live-chat-flow).
It is published as **Flow Chat for YouTube Live Fix**.

The original MIT License and copyright notice are retained in
[LICENSE](LICENSE).

> Chrome Extension for Flow Chat Messages on YouTube Live.

## Changes in This Fork

- Fixed the Flow Chat player button layout for the current YouTube player controls.
- Added rendering optimizations and a Low Power Mode to reduce GPU/rendering load.
- Added provisional English and Japanese localization for extension settings.

## Features

- Flow messages over the video.
- Change color, size and speed for messages.
- Show author and avatar on messages.
- Show super chats and super stickers.
- Move the chat input to bottom controls on the video.
- Add helper menu buttons on the chat list.

## Screenshots

![screenshot](.github/img/screenshot1.gif)

## Installation

1. Download `archive.zip` from [releases page](https://github.com/subdiox/youtube-live-chat-flow/releases) and unzip this file.
2. Open the Extension Management page by navigating to `chrome://extensions`.
3. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
4. Click the **LOAD UNPACKED** button and select the unpacked directory named `app`.

## Development

```bash
# install dependencies
yarn

# watch files changed and reload extension
yarn dev
```
