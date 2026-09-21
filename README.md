# Web MiniDisc Pro

Copy audio to your NetMD MiniDisc device using only a web browser. Replace SonicStage, improve audio quality, and unlock new features. 

Live @ [https://web.minidisc.wiki/](https://web.minidisc.wiki/).

Full user guide @ [the MiniDisc Wiki](https://www.minidisc.wiki/guides/webminidisc/start)

## Requirements

- a NetMD recorder
- USB cable (most use USB Mini-B)
- Chromium web browser (Google Chrome, Microsoft Edge, Brave, etc.) or any other browser that supports both WASM and WebUSB

## Installation

### macOS
_it just works ®_ ... no need to download or install any software. Safari is not currently supported; please use a Chromium browser instead.

Some macOS-specific issues are documented in the [troubleshooting page](https://www.minidisc.wiki/guides/webminidisc/troubleshooting) of the user guide.

For macOS developers, see [here](#development-on-macos).

### Linux
Follow the instructions from the [user guide here](https://www.minidisc.wiki/guides/webminidisc/requirements#linux) or [the linux-minidisc project here](https://github.com/glaubitz/linux-minidisc/tree/master/netmd/etc) to grant your user access to the device. If you skip this step you'll likely get an *Access denied* message when trying to connect.

If you use a "packaged" version of Chromium, such as from the Ubuntu Store, you will encounter more issues. [Refer to the user guide for more details.](https://www.minidisc.wiki/guides/webminidisc/requirements#packaged_browsers)

### Windows
The Windows USB stack requires a driver to be installed before using Web MiniDisc Pro. The driver installation requires Administrator privileges. 

[See the full details in the user guide here.](https://www.minidisc.wiki/guides/webminidisc/requirements#windows) - it is usually as simple as using [Zadig to install the driver.](https://zadig.akeo.ie/)

Note: restart your browser after installation.

### Chrome OS
Works without any additional set up - tested with 91 stable (91.0.4472.102). If your user account or device is managed (by your school or company) you may run into issues. If you are using a personal Google account on a personal Chromebook you should be good to go.

-----
## Differences between [Web Minidisc](https://github.com/cybercase/webminidisc) and Web Minidisc Pro
Web MiniDisc Pro was forked from the original Web MiniDisc to provide a more advanced workflow for interacting with NetMD devices. 

In addition to the standard NetMD features that Web MiniDisc provides, Web MiniDisc Pro also features:
- The ability to connect to NetMD units available on the local network with the help of [Remote NetMD](https://github.com/asivery/remote-netmd-server)
- Downloading tracks from the player via standard NetMD commands (Sony MZ-RH1 only)
- Improved handling of pre-encoded ATRAC3 tracks
- Song Recognition
- The ability to use an external ATRAC3 encoder for better audio quality when using LP modes

*The following features depend on Factory mode commands. See [netmd-exploits](https://github.com/asivery/netmd-exploits/) for a list of supported devices*
- Downloading tracks from any Sony (or Aiwa) NetMD device
- Firmware and RAM dumping 
- TOC manipulation
- Tetris

-----
## Development

Development discussion and coordination happens through the [MiniDisc.wiki Discord server](https://minidisc.wiki/discord) in the #research channel

### How to build

The project is built with [Vite](https://vite.dev/) and requires **Node.js 22.12 or newer**.

- `npm install` to install the required node modules
- `npm start` (or `npm run dev`) to start the development server
- `npm run build` to type-check and build for production into `dist/`
- `npm run preview` to serve the production build locally at http://localhost:4173
- `npm run lint` to run ESLint

WebUSB only works in a secure context, so the app can reach devices when served from `localhost` or over HTTPS, but not over plain HTTP on any other host.

WASM modules are provided in the `public/` directory. However, if you wish to build those binaries yourself, instructions are provided in the `extra/` directory (see [BUILD_FFMPEGJS.md](extra/BUILD_FFMPEGJS.md) and [BUILD_ATRACDENC.md](extra/BUILD_ATRACDENC.md)).

### Self-hosting with Docker

`Dockerfile.server` builds the app and serves it with nginx on port 8080, so the host only needs Docker:

```sh
docker build -f Dockerfile.server -t webminidisc .
docker run --rm -p 8080:8080 webminidisc
```

`docker-compose.yml` runs the same image without publishing a port, for use behind a reverse proxy. The proxy **must** terminate TLS: over plain HTTP the app loads, but it can never connect to a device. To serve from a subdirectory rather than the root of a hostname, pass `--build-arg PUBLIC_URL=/some/path/`.

(The plain `Dockerfile` is the one CI publishes to Docker Hub; it expects `dist/` to have been built on the host first.)

-----
### Development on macOS

No native toolchain is needed. Install Node.js 22.12 or newer (for example with [Homebrew](https://brew.sh/): `brew install node`), then follow [How to build](#how-to-build).

`npm install` may warn that the `usb` and `dtrace-provider` packages have install scripts that were not run. They are Node-only dependencies of the device libraries and are not used by the web app, so the warning can be ignored.

-----
### How to contribute
If there's a feature you'd like to see implemented in Web MiniDisc Pro, feel free to submit a pull request.

### Bugs and issues
Feel free to submit any issues as a GitHub issue. Web MiniDisc Pro is a hobby project and the developers cannot make guarantees about timeliness of bugfixes. If you have the skills to implement fixes yourself, we're more than happy to review pull requests.

### Forks
Web MiniDisc Pro and its predecessors are GPL licensed. You are free to fork or clone and create your own instance. However we ask that you:
- Change the name and description so that users do not confuse your fork with the upstream project
- Update bug reporting links to your own repo rather than this upstream one
- Remove the included reference to the LP encoding server provided by the MiniDisc Wiki project, or contact them for permission to include it

## Credits
- [FFmpeg](https://www.ffmpeg.org/) *and* [ffmpegjs](https://github.com/ffmpegjs/FFmpeg) *to read audio files (wav, mp3, ogg, mp4, etc...).*
- [Atracdenc](https://github.com/dcherednik/atracdenc/) *to support atrac3 encoding (lp2, lp4 audio formats).*
- [Emscripten](https://emscripten.org/) *to run both FFmpeg and Atracdenc in the browser.*
- [netmd-js](https://github.com/cybercase/netmd-js) *to send commands to NetMD devices using Javascript*
- [MUI](https://mui.com/) *to build the user interface.*
- [linux-minidisc](https://github.com/linux-minidisc/linux-minidisc) *to build the netmd-js library.*
- [netmd-exploits](https://github.com/asivery/netmd-exploits/) *For factory mode commands and track dumping*
