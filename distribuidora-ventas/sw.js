// Define un nombre y versión para tu caché
const CACHE_NAME = 'distribuidora-cache-v1';

// Lista de URLs que se guardarán en el caché durante la instalación
const urlsToCache = [
  './ventas.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@17/umd/react.development.js',
  'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Evento 'install': Se dispara cuando el Service Worker se instala.
// Abre el caché y guarda los archivos de la app.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto y guardando archivos base');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falló el cacheo de archivos durante la instalación:', err);
      })
  );
});

// Evento 'fetch': Se dispara cada vez que la página pide un recurso (un archivo, una imagen, una llamada a la API).
// Implementa una estrategia "Cache First": primero busca en el caché y si no lo encuentra, va a la red.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en el caché, lo devuelve desde ahí.
        if (response) {
          return response;
        }
        // Si no, lo pide a la red.
        return fetch(event.request);
      })
  );
});

// Evento 'activate': Se dispara cuando el nuevo Service Worker se activa.
// Aquí se pueden limpiar cachés viejos de versiones anteriores.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
