const staticCacheName = 's-app-v1'
const dynamicCacheName = 'd-app-v1'

const assertUrls = [
    '/',
    '/js/app.js',
    '/css/styles.css',
    'offline.html'
]

const cacheFirst  = async (request) => {
    const cached = await caches.match(request)
    if (!cached){
        console.log(`???? URL: ${request.url} NOT in cache`)
        return fetch(request);
    }
    console.log(`!!!! URL: ${request.url} in cache`)
    return cached
}

const networkFirst = async (request) => {
    const dynamicCache = await caches.open(dynamicCacheName)
    try{
        const response = await fetch(request);
        await dynamicCache.put(request, response.clone())
        return response
    }
    catch (e){
        const cached = await dynamicCache.match(request)
        if (!cached){
            console.log('NO CACHED REQUEST')
            return caches.match('offline.html')
        }
        return cached
    }
}

self.addEventListener('install', async (e) => {
    console.log('SW: install')
    const staticCache = await caches.open(staticCacheName);
    await staticCache.addAll(assertUrls)
})

self.addEventListener('activate', async (e) => {
    const cache = await caches.keys()
    await Promise.all(
        cache.filter((name) => name !== staticCacheName)
        .filter((name) => name !== dynamicCacheName)
        .map((name) => caches.delete(name))
    )
    console.log('SW: activate')
})

self.addEventListener('fetch', async (e) => {
    console.log('SW: fetch: ', e.request.url)
    console.log('SW: fetch: ', e.request.destination)
    const url = new URL(e.request.url)
    if  (url.origin === location.origin){
        e.respondWith(cacheFirst(e.request))
    }
    else{
        e.respondWith(networkFirst(e.request))
    }

})
self.addEventListener('push', (e) => {
    const body = e.data.json()
    console.log(body)
    self.registration.showNotification(body.title, {
        body: 'Test notification',
    })
} )
