const cacheName = "api-cache";

self.addEventListener("install", (event: any) => {
    event.waitUntil(caches.open(cacheName));
});

self.addEventListener("fetch", (event: any) => {
    // Check if this is a request for an image
    if (
        event.request.url.startsWith("https://api.datacorda.com") &&
        event.request.method === "GET"
    ) {
        event.respondWith(
            caches.open(cacheName).then((cache) => {
                // Go to the cache first
                return cache.match(event.request.url).then((cachedResponse) => {
                    // Return a cached response if we have one
                    const date = new Date(String(cachedResponse?.headers.get("expires")));

                    const cacheExpired = Date.now() > date.getTime();

                    if (cachedResponse && !cacheExpired) {
                        return cachedResponse;
                    }

                    cache.delete(event.request);

                    // Otherwise, hit the network
                    return fetch(event.request).then((fetchedResponse) => {
                        const headers = new Headers(fetchedResponse.headers);
                        headers.append("Cache-Control", "public");
                        headers.append("Expires", `${new Date(Date.now() + 1000 * 60 * 60 * 24)}`);

                        const response = new Response(fetchedResponse.body, {
                            status: fetchedResponse.status,
                            statusText: fetchedResponse.statusText,
                            headers,
                        });
                        // Add the network response to the cache for later visits
                        cache.put(event.request, response.clone());

                        // Return the network response
                        return response;
                    });
                });
            })
        );
    }
});
