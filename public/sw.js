importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log('New SW added 15');

workbox.routing.registerRoute(
  new RegExp('/static/js/*'),
  new workbox.strategies.StaleWhileRevalidate(),
);


workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "78801f3afbbc1ca6ebf89c2439c78649"
  },
  {
    "url": "fonts/Raleway/OFL.txt",
    "revision": "52a45f434f9a511a88f9e2adeead6e06"
  },
  {
    "url": "fonts/Raleway/Raleway-Black.ttf",
    "revision": "3fc090e7188efb11fe2fef586bbb1a44"
  },
  {
    "url": "fonts/Raleway/Raleway-BlackItalic.ttf",
    "revision": "1ec88bc52d1686c5192b34435fff8ea1"
  },
  {
    "url": "fonts/Raleway/Raleway-Bold.ttf",
    "revision": "575e4317521b381ac94c0c8207c81979"
  },
  {
    "url": "fonts/Raleway/Raleway-BoldItalic.ttf",
    "revision": "c7a4548f69aa83778b84585f5bb558b9"
  },
  {
    "url": "fonts/Raleway/Raleway-ExtraBold.ttf",
    "revision": "a38a54df0089bca4f5109fe44f944051"
  },
  {
    "url": "fonts/Raleway/Raleway-ExtraBoldItalic.ttf",
    "revision": "e314d73289b57b6764c143bfefc1016c"
  },
  {
    "url": "fonts/Raleway/Raleway-ExtraLight.ttf",
    "revision": "1f43e4f21a0b08df2629fe68a0b72721"
  },
  {
    "url": "fonts/Raleway/Raleway-ExtraLightItalic.ttf",
    "revision": "9d3080b9f3c5de2b749c4ba3ce446d29"
  },
  {
    "url": "fonts/Raleway/Raleway-Italic.ttf",
    "revision": "dd03a26a6d06f63d75ceeac6b491f26a"
  },
  {
    "url": "fonts/Raleway/Raleway-Light.ttf",
    "revision": "b1bdea561f247adc2c904f5b24a07c51"
  },
  {
    "url": "fonts/Raleway/Raleway-LightItalic.ttf",
    "revision": "d817d3a18e437e12e243aa3475b89f53"
  },
  {
    "url": "fonts/Raleway/Raleway-Medium.ttf",
    "revision": "430a0518f5ff3b6c8968b759a29b36e2"
  },
  {
    "url": "fonts/Raleway/Raleway-MediumItalic.ttf",
    "revision": "ff3c8ca6aa39754108f381ba4d7d5c13"
  },
  {
    "url": "fonts/Raleway/Raleway-Regular.ttf",
    "revision": "580d0778ad254335be45bf58bb449f43"
  },
  {
    "url": "fonts/Raleway/Raleway-SemiBold.ttf",
    "revision": "17ba6410cbc694808961a988fd4426de"
  },
  {
    "url": "fonts/Raleway/Raleway-SemiBoldItalic.ttf",
    "revision": "0ef49fe89bb646aed7c0a10852b7d342"
  },
  {
    "url": "fonts/Raleway/Raleway-Thin.ttf",
    "revision": "9f5eec4e61754abf89124df236b87358"
  },
  {
    "url": "fonts/Raleway/Raleway-ThinItalic.ttf",
    "revision": "15c46f66688256cc6bfc826f33bc0a1d"
  },
  {
    "url": "icon_lg.png",
    "revision": "8698cd89251dfca6d69a99b9a10ec83c"
  },
  {
    "url": "icon_sm.png",
    "revision": "812be99a693619448e2da993438dbf0d"
  },
  {
    "url": "images/landingpage/signup_bg/b-01.jp2",
    "revision": "770c93d2ff6fdbb0e7e6077b5442394d"
  },
  {
    "url": "images/landingpage/signup_bg/b-01.jpg",
    "revision": "6979b5f75b04592458c1144a5ed78b9a"
  },
  {
    "url": "images/landingpage/signup_bg/b-01.jxr",
    "revision": "a5ee50295cd1bca1043d881e3fed6c81"
  },
  {
    "url": "images/landingpage/signup_bg/b-01.png",
    "revision": "0f416af230608a6b279e251b4514601c"
  },
  {
    "url": "images/landingpage/signup_bg/b-01.tif",
    "revision": "326a0630ca9a8777dbebedad25c92659"
  },
  {
    "url": "images/landingpage/signup_bg/b-01.webp",
    "revision": "aa4ae61c3d29006d2f19053c0792f9ce"
  },
  {
    "url": "images/marketplace/b-01-min.jpg",
    "revision": "4460a6cea64a122c2a660641c8a4b371"
  },
  {
    "url": "images/marketplace/customs1/customs1.jp2",
    "revision": "3800ce0473ae3f3d7003cef87f56eb59"
  },
  {
    "url": "images/marketplace/customs1/customs1.jxr",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/marketplace/customs1/customs1.png",
    "revision": "d1e84cd7000a7cb62ddb08f286721160"
  },
  {
    "url": "images/marketplace/customs1/customs1.tif",
    "revision": "21f84fdff5ce64ce2cebb3fd2160c537"
  },
  {
    "url": "images/marketplace/customs1/customs1.webp",
    "revision": "02b12f972e74f42007765622d840fb19"
  },
  {
    "url": "images/marketplace/imac/imac.jp2",
    "revision": "b56374f6ff1f3d8091b669d2edf2e413"
  },
  {
    "url": "images/marketplace/imac/imac.jxr",
    "revision": "c58b9573793d616f34762d2b2124af50"
  },
  {
    "url": "images/marketplace/imac/imac.png",
    "revision": "f70973f95d0c05e5e3b3eefc60a4ebf1"
  },
  {
    "url": "images/marketplace/imac/imac.webp",
    "revision": "8547e6ec8f9da91727ea02ca18b65b5d"
  },
  {
    "url": "images/marketplace/landing_bottom/landing_bottom.jp2",
    "revision": "33864ea88cd143a0e816cdc2123e4612"
  },
  {
    "url": "images/marketplace/landing_bottom/landing_bottom.jxr",
    "revision": "c56f5a309cfced7081b92e33c6f8bf53"
  },
  {
    "url": "images/marketplace/landing_bottom/landing_bottom.png",
    "revision": "c552fe0af58a94ce32af6a34685dd891"
  },
  {
    "url": "images/marketplace/landing_bottom/landing_bottom.webp",
    "revision": "7701e4dcef02010bd5a8fce7c9e24522"
  },
  {
    "url": "images/marketplace/loader1/loader1.jp2",
    "revision": "7b72b362ce5fadeba53e3c5876a444f9"
  },
  {
    "url": "images/marketplace/loader1/loader1.jxr",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/marketplace/loader1/loader1.png",
    "revision": "753f5ed17c7d7fe606435dbd2bd5f7c7"
  },
  {
    "url": "images/marketplace/loader1/loader1.tif",
    "revision": "36fa45259634604b7e76a37e811f945d"
  },
  {
    "url": "images/marketplace/loader1/loader1.webp",
    "revision": "f247c6ed5fd29a42f882fdae9461a78d"
  },
  {
    "url": "images/marketplace/magnifier/magnifier.jp2",
    "revision": "4b20ea968e5b4e8a43cec959e8c6b81e"
  },
  {
    "url": "images/marketplace/magnifier/magnifier.jxr",
    "revision": "fb58b0843fcfe51ebf36780f3815eef9"
  },
  {
    "url": "images/marketplace/magnifier/magnifier.png",
    "revision": "2f632e04d51fe45c524a6c151f7c44ab"
  },
  {
    "url": "images/marketplace/magnifier/magnifier.webp",
    "revision": "1255ae736e5ae52fb4eb30b113bd1382"
  },
  {
    "url": "images/marketplace/pin/pin.jp2",
    "revision": "e95f3e7f8c1608b4e9b864fda8775d90"
  },
  {
    "url": "images/marketplace/pin/pin.jxr",
    "revision": "618f62dc507c6a4914c9633f0e9c3536"
  },
  {
    "url": "images/marketplace/pin/pin.png",
    "revision": "3eb7a58765209de80f523f1124988f18"
  },
  {
    "url": "images/marketplace/pin/pin.webp",
    "revision": "45d17d6e0ccce99c80e8a67643b09122"
  },
  {
    "url": "images/marketplace/section1_bg/section1_bg.jp2",
    "revision": "b429010634557c9468826277dc081f3b"
  },
  {
    "url": "images/marketplace/section1_bg/section1_bg.jpg",
    "revision": "9de9649e4b6ca1d47834be94444b56a9"
  },
  {
    "url": "images/marketplace/section1_bg/section1_bg.jxr",
    "revision": "8d99d9398842bb4192dcf672bd2e2d88"
  },
  {
    "url": "images/marketplace/section1_bg/section1_bg.png",
    "revision": "83f02967e73519b18c7e5f5597c947bd"
  },
  {
    "url": "images/marketplace/section1_bg/section1_bg.tif",
    "revision": "964fd4ff6699e4f66f776ed64f4b6ff3"
  },
  {
    "url": "images/marketplace/section1_bg/section1_bg.webp",
    "revision": "fa21635ce37057f098b9cd1efdaa29b1"
  },
  {
    "url": "images/whatsapp/hector/hector.jp2",
    "revision": "3a70e7a07a7a37d4afb2e7c4dbc7d654"
  },
  {
    "url": "images/whatsapp/hector/hector.jxr",
    "revision": "de7521637dc0c8147e918f50d3c21936"
  },
  {
    "url": "images/whatsapp/hector/hector.png",
    "revision": "957e166030d60645d5bb70b4bce19582"
  },
  {
    "url": "images/whatsapp/hector/hector.tif",
    "revision": "42cb57b2d335c5bcc0585e3718ec7b1b"
  },
  {
    "url": "images/whatsapp/hector/hector.webp",
    "revision": "c7d13c41f39328f1b71f4a7936f84454"
  },
  {
    "url": "images/whatsapp/juan/juan.jp2",
    "revision": "79e240ddb3594f3801af96aa84d557f4"
  },
  {
    "url": "images/whatsapp/juan/juan.jxr",
    "revision": "642ae90f43c8584dc9b1bdbeebc697ef"
  },
  {
    "url": "images/whatsapp/juan/juan.png",
    "revision": "e3172cd2587388bc84aa23f46ed530eb"
  },
  {
    "url": "images/whatsapp/juan/juan.tif",
    "revision": "8b0d88e7a93188da80f220339a0d5e0d"
  },
  {
    "url": "images/whatsapp/juan/juan.webp",
    "revision": "330c79c07b2e90ac1c6a4462caf2eabb"
  },
  {
    "url": "images/whatsapp/steve/steve.jp2",
    "revision": "edae8d74ab72ca475c635c7cc2b34a79"
  },
  {
    "url": "images/whatsapp/steve/steve.jxr",
    "revision": "b8ad1a7bdc468289b505e2f2320f32df"
  },
  {
    "url": "images/whatsapp/steve/steve.png",
    "revision": "bf4c9635298d0a1e3995f1f2fa4347d6"
  },
  {
    "url": "images/whatsapp/steve/steve.tif",
    "revision": "1eb36800bf3032139790373394960cb2"
  },
  {
    "url": "images/whatsapp/steve/steve.webp",
    "revision": "44777775ad7f61fffb9108ad6c629e70"
  },
  {
    "url": "index.html",
    "revision": "14adfae18ab988ff694b090cf60c65d9"
  },
  {
    "url": "logos/loading_logo.png",
    "revision": "4101f4e637de8f13487c6e8bda7e5d9e"
  },
  {
    "url": "logos/Logo 1 - Blue.png",
    "revision": "4ad4bad61a32e1914b5e70f64c25d745"
  },
  {
    "url": "logos/Logo 1a - Blue.png",
    "revision": "38d6af36f6139e79711bcc55a9ab082a"
  },
  {
    "url": "logos/Logo 2 - Dark Grey.png",
    "revision": "ba19da6b895758961ee20b74fa5c4111"
  },
  {
    "url": "logos/Logo 2a - Dark Grey.png",
    "revision": "0aac99e66d549f89e7ab2640938d865b"
  },
  {
    "url": "logos/Logo 3 - Grey.png",
    "revision": "4c62b20cebf416e3c1bc7e8981c9f6df"
  },
  {
    "url": "logos/Logo 3a - Grey.png",
    "revision": "071198bdaf1a37ddb1ce64dd47a08e81"
  },
  {
    "url": "logos/Logo 4a - White.png",
    "revision": "a5717720b1bfdee1eb89cdaf84fe6902"
  },
  {
    "url": "logos/Logo 5 - Black.png",
    "revision": "62c9904aa6aacca4c17ac5b944e5e0d3"
  },
  {
    "url": "logos/Logo 5a - Black.png",
    "revision": "229620b5344d3e4c22bd92f1e9e6f9b1"
  },
  {
    "url": "logos/Logo 6 - Light Grey.png",
    "revision": "a1189c5b5ad2ba9326e190fe48b32dff"
  },
  {
    "url": "logos/Logo 7 - Grey White Mix.png",
    "revision": "58899352f164894027310b32793357d6"
  },
  {
    "url": "logos/Logo 8 - Grey Black Mix.png",
    "revision": "7d527c836c687b335285ff5ded489cc3"
  },
  {
    "url": "logos/logo.png",
    "revision": "069239f44cbdd150d3803223c745b682"
  },
  {
    "url": "logos/logo4white_cs.png",
    "revision": "77923f04ffeac1e79192c5d64549cd77"
  },
  {
    "url": "logos/logo4white.png",
    "revision": "86de7d6f1872acf442a26a4744d85b95"
  },
  {
    "url": "logos/sm_logo.jp2",
    "revision": "b954730617ee202ac3d0bc42f11be429"
  },
  {
    "url": "logos/sm_logo.jxr",
    "revision": "68b6ebf6b06815376ec61f34eac4a823"
  },
  {
    "url": "logos/sm_logo.png",
    "revision": "63eb407975948c996882b556c03f1abe"
  },
  {
    "url": "logos/sm_logo.tif",
    "revision": "171351dbf825dddc24101547f27395a3"
  },
  {
    "url": "logos/sm_logo.webp",
    "revision": "f9f956982da9bb413c43d00227843dac"
  },
  {
    "url": "manifest.json",
    "revision": "d8d7deec4f56344eac90829d877feb13"
  },
  {
    "url": "OneSignalSDKUpdaterWorker.js",
    "revision": "ebb63ca15bba16b550232b0b0f66c726"
  },
  {
    "url": "OneSignalSDKWorker.js",
    "revision": "24e4afd7fd4c7234f340963023080210"
  }
]);