function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const APPLICATION_SERVER_KEY = 'BGRk5uAAX7WLhI8BPETz-cQ4xdO_B0UKZFmzSe3AOjiyNPEDpY7h7Bg5vhN4s53_fDhYp6Izud_XlNCS_r7PoXg'
window.addEventListener('load', async () => {
  // navigator.push.unregister()
  // return
  if (navigator.serviceWorker) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')

      const oldSubscripion = await reg.pushManager.getSubscription()


      // !!!!!!!!!!!!!!!
      // oldSubscripion.onsubscribe()
      // !!!!!!!!!!!!

      console.log('OLDSUBSCTIPTION', oldSubscripion)
      window.subscription = oldSubscripion
      if (!oldSubscripion){
        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(APPLICATION_SERVER_KEY)
        })
        window.subscription = subscription
      }
      console.log(oldSubscripion)
      console.log('Service worker register success', reg)
    } catch (e) {
      console.log(e)
      console.log('Service worker register fail')
    }
  }

  await loadPosts()
})


async function loadPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
  const data = await res.json()

  const container = document.querySelector('#posts')
  container.innerHTML = data.map(toCard).join('\n')
}

function toCard(post) {
  return `
    <div class="card">
      <div class="card-title">
        ${post.title}
      </div>
      <div class="card-body">
        ${post.body}
      </div>
    </div>
  `
}

const sendNotification = () => {
  const notifyBody = 'Created by Test'
  const notifyTitle = 'Hello world!'
  const options = {
    body: notifyBody
  }
  setInterval(() => {
    new Notification(notifyTitle, options)
  }, 5000)
}

const notifyBtn = document.querySelector("#notify-btn")

notifyBtn.addEventListener('click', async () => {
  const permission = await Notification.requestPermission()
  console.log(`notifications status: ${permission}`)
  if (permission === 'granted'){
    console.log(window.permission)
    await fetch('http://localhost:6868/subscribe', {
      method: 'POST',
      body: JSON.stringify(window.subscription),
      headers: {
        'content-type': "application/json"
      }
    })
  }
})
