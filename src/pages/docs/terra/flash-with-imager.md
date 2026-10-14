---
layout: ../../../layouts/DocPage.astro
title: Flash with Raspberry Pi Imager
description: A 64-bit Bookworm card for Raspberry Pi 4 and Pi 5. Imager writes the username, password, SSH key, Wi-Fi, hostname, and timezone, and the Pi applies them at first boot.
kicker: Terra
note: This image is a pre-release. It has not yet been verified on hardware. Treat the first boot on a Pi as a test.
manualHref: https://super-yojan.dev/Terra/
manualLabel: Terra manual
repoHref: https://github.com/Super-Yojan/terra-image-gen
repoLabel: Image repository
---

Terra is a 64-bit Raspberry Pi OS Bookworm image for Raspberry Pi 4 and Pi 5. The Fusion HAT driver and the `terra-rover` service are already installed. Raspberry Pi Imager sets the username, password, SSH key, Wi-Fi, hostname, and timezone while it writes the card. That OS customisation is applied at first boot. A stock Imager is enough.

Use Imager 1.8.x, 1.9.x, or 2.x. The OS list sets `init_format` to `systemd`, which is the customisation format those versions apply.

Source install, Bluetooth pairing, and the bench outline stay in the [Terra manual](https://super-yojan.dev/Terra/hardware/INSTALL/). This page is the card.

## Install Raspberry Pi Imager

Download it from [raspberrypi.com/software](https://www.raspberrypi.com/software/). Quit Imager if it is already open before you use a launcher below.

## Open the Terra OS list

The stable address always points at the current list:

[https://github.com/Super-Yojan/terra-image-gen/releases/latest/download/terra-os-list.json](https://github.com/Super-Yojan/terra-image-gen/releases/latest/download/terra-os-list.json)

This pre-release is [terra-image-v0.1.0-rc3](https://github.com/Super-Yojan/terra-image-gen/releases/tag/terra-image-v0.1.0-rc3). The same list, pinned to that release:

[https://github.com/Super-Yojan/terra-image-gen/releases/download/terra-image-v0.1.0-rc3/terra-os-list.json](https://github.com/Super-Yojan/terra-image-gen/releases/download/terra-image-v0.1.0-rc3/terra-os-list.json)

### macOS

```sh
open -a "Raspberry Pi Imager" --args --repo "https://github.com/Super-Yojan/terra-image-gen/releases/latest/download/terra-os-list.json"
```

### Linux

```sh
rpi-imager --repo "https://github.com/Super-Yojan/terra-image-gen/releases/latest/download/terra-os-list.json"
```

### Windows

```bat
"%ProgramFiles%\Raspberry Pi Imager\rpi-imager.exe" --repo "https://github.com/Super-Yojan/terra-image-gen/releases/latest/download/terra-os-list.json"
```

The same three commands are [`open-imager-macos.sh`](https://github.com/Super-Yojan/terra-image-gen/blob/cursor/terra-sd-image-deab/examples/terra/imager/open-imager-macos.sh), [`open-imager-linux.sh`](https://github.com/Super-Yojan/terra-image-gen/blob/cursor/terra-sd-image-deab/examples/terra/imager/open-imager-linux.sh), and [`open-imager-windows.cmd`](https://github.com/Super-Yojan/terra-image-gen/blob/cursor/terra-sd-image-deab/examples/terra/imager/open-imager-windows.cmd) in the image repository.

Imager opens with Terra as the operating system, instead of the full Raspberry Pi catalog. Choose Terra (64-bit). Choose Pi 4 or Pi 5 when Imager asks for a device.

## Choose the card

Pick the SD card. Imager shows its size. The Terra image needs a card of at least 8 GB.

## Set OS customisation

Imager 1.8 and 1.9 show a gear icon, or the shortcut Ctrl+Shift+X, after you choose the OS. Imager 2.x asks for these settings on the customisation page before it writes.

Set:

- Hostname, if you want a fixed name. Leave it blank and the card names itself `terra-` plus the last six hex digits of the Pi serial.
- Username and password. This password is the one that logs in. The image does not ship a password of its own.
- Wi-Fi SSID, password, and country. The country must be the regulatory country of the network.
- Timezone and keyboard.
- SSH. To log in with the password you just set, enable SSH and choose password authentication. To log in with a key instead, choose public-key authentication and paste the public key. If you set a public key, Imager turns password login off for that card.

Save, then write. Imager downloads the compressed image, checks its size and sha256 against the OS list, and writes the card.

## Boot and sign in

Eject the card, put it in the Pi, and power it on. The first start applies the username, password, SSH key, Wi-Fi, hostname, and timezone, then reboots once. The next start expands the root filesystem, generates SSH host keys, and starts `terra-rover`. The USR button on the Fusion HAT opens terra-rover's pairing window. It does not block SSH. You do not need to hold it to log in.

Connect the Pi with Ethernet, or with the Wi-Fi network you set in Imager. Then:

```sh
ssh <user>@<hostname>.local
```

`<user>` and `<hostname>` are the username and hostname from OS customisation. If you left the hostname blank, try `terra-` and the last six hex digits of the Pi serial, or look the address up on the router. The first connection asks you to accept a new host key. That key was created on the Pi.

`sudo` does not ask for a password.

## If you already have the image file

You can still write `terra-bookworm-arm64.img.xz` with Imager's "Use custom" file picker. Imager 1.8 treats a local file as `systemd` customisation and will apply the settings above. Imager 2.x treats a local file as having no customisation unless you open Imager with the `--repo` command above and pick Terra from that list. Use the launcher when you want the settings dialog.

## Release terra-image-v0.1.0-rc3

The OS list downloads the image attached to [terra-image-v0.1.0-rc3](https://github.com/Super-Yojan/terra-image-gen/releases/tag/terra-image-v0.1.0-rc3):

[https://github.com/Super-Yojan/terra-image-gen/releases/download/terra-image-v0.1.0-rc3/terra-bookworm-arm64.img.xz](https://github.com/Super-Yojan/terra-image-gen/releases/download/terra-image-v0.1.0-rc3/terra-bookworm-arm64.img.xz)

- sha256: `56c89d430b2f05152657b9ef916718879d4a18ad472c31edfe2ae66e80b7e464`
- size: 289423836 bytes
- uncompressed image sha256: `bfe43f3904a34946b2f9d0ec2ff94e43998a94ba4cc7d8aae53ef5a4823b8c9f`
- uncompressed size: 2063597568 bytes

Imager checks the download against `image_download_sha256` in the OS list before it writes.

## What the image does not contain

No Wi-Fi password, no SSH key, and no login password are baked into the file you download. Each card gets its own machine-id and SSH host keys on first boot. This image is a pre-release and has not yet been verified on hardware.
