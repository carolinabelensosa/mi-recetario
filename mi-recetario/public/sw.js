const CACHE_NAME = 'mi-recetario-v4';

self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/manifest.json',
                '/favicon.svg',
                '/assets/index-ClHf-nUT.css',
                '/assets/index-NwFfMAom.js',
                '/icons/icon-192.png',
                '/icons/icon-512.png'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');

    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            const url = new URL(event.request.url);
            const ruta = url.pathname;

            return cache.match(ruta).then((respuesta) => {
                if (respuesta) {
                    console.log('Archivo encontrado en caché:', ruta);
                    return respuesta;
                }

                return fetch(event.request).catch(() => {
                    return new Response('No hay conexión a Internet.', {
                        status: 503,
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    });
                });
            });
        })
    );
});
