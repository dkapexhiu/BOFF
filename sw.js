// ServiceWorker
var cacheName = 'v1'; 

// Default files to always cache
var cacheFiles = [  
    '/',
    '/index.html',
    '/js/jquery.fitvids.js',
    '/js/script.js',
    '/css/style.css',
    'https://fonts.googleapis.com/css?family=Lora',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://unpkg.com/scrollreveal/dist/scrollreveal.min.js',
    '/img/bg.jpg',
    '/img/brooklyn-bridge-film-festival.jpg',
    '/img/brooklyn-bridge-film-festival2.jpg',
    '/img/brooklyn-bridge-film-festival3.jpg',
    '/img/brooklyn-bridge-film-festival4.jpg',
    '/img/brooklyn-bridge-film-festival6.jpg',
    '/img/icon.png',
    '/img/pedro-almodovar.jpg',
    '/img/checkmark.png',
    '/img/xmark.png'
]


self.addEventListener('install', function(e) {  
    console.log('ServiceWorker Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

        // Open the cache
        caches.open(cacheName).then(function(cache) {

            // Add all the default files to the cache
            console.log('ServiceWorker Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});


self.addEventListener('activate', function(e) {  
    console.log('ServiceWorker Activated');

    e.waitUntil(

        // Get all the cache keys (cacheName)
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                // If a cached item is saved under a previous cacheName
                if (thisCacheName !== cacheName) {

                    // Delete that cached file
                    console.log('ServiceWorker Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );

});

self.addEventListener('fetch', function(e) {  
    console.log('ServiceWorker Fetch', e.request.url);

    // e.respondWidth Responds to the fetch event
    e.respondWith(

        // Check in cache for the request being made
        caches.match(e.request)

            .then(function(response) {

                // If the request is in the cache
                if ( response ) {
                    console.log("ServiceWorker Found in Cache", e.request.url, response);
                    // Return the cached version
                    return response;
                }

                // If the request is NOT in the cache, fetch and cache

                var requestClone = e.request.clone();
                fetch(requestClone)
                    .then(function(response) {

                        if ( !response ) {
                            console.log("ServiceWorker no response from fetch ")
                            return response;
                        }

                        var responseClone = response.clone();

                        //  Open the cache
                        caches.open(cacheName).then(function(cache) {

                            // Put the fetched response in the cache
                            cache.put(e.request, responseClone);
                            console.log('ServiceWorker New Data Cached', e.request.url);

                            // Return the response
                            return response;

                        }); // end caches.open

                    })
                    .catch(function(err) {
                        console.log('ServiceWorker Error Fetching & Caching New Data', err);
                    });
            })
    );
});

//Push notifications
self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('http://dkapexhiu.github.io/brooklyn-outdoor-film-festival/');
      notification.close();
    }

});


