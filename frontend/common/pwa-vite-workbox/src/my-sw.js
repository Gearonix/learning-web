// import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst  } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING')
        self.skipWaiting()
})

registerRoute(
    // проверяем, что запрос - это переход на новую страницу
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        // помещаем все файлы в кэш с названием 'pages'
        cacheName: 'pages',
        plugins: [
            // кэшируем только результаты со статусом 200
            new CacheableResponsePlugin({
                statuses: [200]
            })
        ]
    })
)

registerRoute(
    ({ url }) =>  url.origin === 'https://fonts.googleapis.com' ||
        url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts',
        plugins: [
            new ExpirationPlugin({ maxEntries: 20 })
        ]
    })
)
registerRoute(
    /https:\/\/jsonplaceholder\.typicode\.com/,
    new NetworkFirst({
        cacheName: 'dynamic',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 10 * 24 * 60 * 60 // 10 дней
            })
        ]
    }),
)

registerRoute(
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new StaleWhileRevalidate({
        // помещаем файлы в кэш с названием 'assets'
        cacheName: 'assets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            })
        ]
    })
)

registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
            })
        ]
    })
)


// self.addEventListener('install', (e) => {
//     console.log('test')
// })
// self.addEventListener('activate', (e) => {
//     console.log('hello')
// })


self.addEventListener('push', (e) => {
    const body = e.data.json()
    console.log(body)
    self.registration.showNotification(body.title, {
        body: 'Test notification',
    })
} )

self.addEventListener('fetch', (e) => {
    console.log(e.request)
})
