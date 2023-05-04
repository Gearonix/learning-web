import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { registerSW } from "virtual:pwa-register";

// add this to prompt for a refresh
const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm("New content available. Reload?")) {
            updateSW(true);
        }
    },
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        const reg = await navigator.serviceWorker.register('/my-sw.js', { scope: '/' })
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

        const oldSubscripion = await reg.pushManager.getSubscription()


        // !!!!!!!!!!!!!!!
        // oldSubscripion.onsubscribe()
        // !!!!!!!!!!!!
        try{
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
    })}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

