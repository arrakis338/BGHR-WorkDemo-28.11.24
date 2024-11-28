const cacheName = "DefaultCompany-Budget Guradian-1.0";
const contentToCache = [
    "Build/6ee980cb1bc813955ed177ea24413bd2.loader.js",
    "Build/52978507bc48ca8a90802c7fdce7da3b.framework.js",
    "Build/5b49a2a6a2e0c7834a362e1bcdc24536.data",
    "Build/94228a890276d4da5feb7612eb57af7b.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
