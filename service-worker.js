// service-worker.js

const CACHE_VERSION = 2; // Increment this version when you update website content
const CACHE_NAME = 'quiz-app-cache-v' + CACHE_VERSION; // Dynamic cache name with version
const FILES_TO_CACHE = [
  '/',
  'index.html',
  '10_Simple_Ways_To_Improve_Your_Networking_Skills_How_To_Network_With_People_Even_If_Youre_Shy!.html',
  'about.css',
  'about.html',
  'android.css',
  'android.html',
  'Best_Networking_Tips_How_To_Make_A_Connection_Indeed.html',
  'Elements_Of_A_Successful_Presentation.html',
  'ios.css',
  'ios.html',
  'lsi2_english.css',
  'lsi2_english.html',
  'lsi2_english.js',
  "quiz.css",
  "script.js",
  "style.css",
  'styles.css',
  'Successful_Meetings_Introduction_To_Meetings.html',
  // ... other assets
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell and content for version:', CACHE_VERSION); // Log version
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('quiz-app-cache-v')) { // Check prefix and version
            console.log('Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});