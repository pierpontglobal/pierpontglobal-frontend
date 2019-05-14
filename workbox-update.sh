#!/usr/bin/env bash

> public/OneSignalSDKWorker.js
random=$(date +%s | sha256sum | base64 | head -c 32)

workbox injectManifest
echo "importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');" >> public/OneSignalSDKWorker.js
echo "importScripts('/sw.js?$random');" >> public/OneSignalSDKWorker.js