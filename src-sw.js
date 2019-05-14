importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log('New SW added 15');

workbox.routing.registerRoute(
  new RegExp('/static/js/*'),
  new workbox.strategies.StaleWhileRevalidate(),
);


workbox.precaching.precacheAndRoute([]);