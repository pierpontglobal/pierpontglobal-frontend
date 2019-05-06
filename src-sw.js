importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log('New SW added');

workbox.routing.registerRoute(
  new RegExp('/static/js/*'),
  new workbox.strategies.CacheFirst(),
);

workbox.precaching.precacheAndRoute([]);
