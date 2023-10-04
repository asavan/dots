const CACHE = "offline-fallback";
self.addEventListener("install", (evt) => {
    evt.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (evt) => {
    evt.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (evt) => {
    evt.respondWith(networkOrCache(evt.request).catch(() => useFallback()));
});


function networkOrCache(request) {
    return fetch(request).then((response) => response.ok ? response : fromCache(request))
        .catch(() => fromCache(request));
}

function useFallback() {
    return caches.open(CACHE).then((cache) => cache.match("./"));
}

function fromCache(request) {
    return caches.open(CACHE).
        then((cache) => cache.match(request).
            then((matching) => matching || Promise.reject("request-not-in-cache")));
}

function precache() {
    const filesToCache = self.__WB_MANIFEST.map((e) => e.url);
    return caches.open(CACHE).then((cache) => cache.addAll([
        "./",
        ...filesToCache
    ]));
}
