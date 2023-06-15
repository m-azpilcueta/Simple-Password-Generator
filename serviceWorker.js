const staticPasswordGenerator = "password-generator-v1";
const assets = ["/", "/index.html", "style.css", "script.js", "icon.png"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticPasswordGenerator).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
