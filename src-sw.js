importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log('New SW added');

workbox.routing.registerRoute(
  new RegExp('/static/js/bundle.js'),
  new workbox.strategies.CacheFirst(),
);

workbox.routing.registerRoute(
  new RegExp('/static/js/1.chunk.js'),
  new workbox.strategies.CacheFirst(),
);

workbox.routing.registerRoute(
  new RegExp('/static/js/main.chunk.js'),
  new workbox.strategies.CacheFirst(),
);

workbox.precaching.precacheAndRoute([]);
