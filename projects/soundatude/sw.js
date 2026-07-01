const CACHE_NAME = "sound-a-tude-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./assets/audio/attitude-effort-sample.mp3",
  "./assets/audio/positive_affirmations1.mp3",
  "./assets/audio/positive_affirmations2.mp3",
  "./assets/audio/positive_affirmations3.mp3",
  "./assets/audio/positive_affirmations4.mp3",
  "./assets/audio/positive_affirmations5.mp3",
  "./assets/audio/positive_affirmations6.mp3",
  "./assets/audio/positive_affirmations7.mp3",
  "./assets/audio/positive_affirmations8.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => (
      cachedResponse || fetch(event.request)
    ))
  );
});
