/* eslint-env serviceworker */

const version = "1.0.0";
const CACHE = "cache-only-" + version;

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => key !== CACHE);
    await Promise.all(cachesToDelete.map(deleteCache));
};

const onActivate = async () => {
    await self.clients.claim();
    await deleteOldCaches();
};

self.addEventListener("install", (evt) => {
    evt.waitUntil(precache().then(() => self.skipWaiting()));
});

self.onactivate = (evt) => evt.waitUntil(onActivate());

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
