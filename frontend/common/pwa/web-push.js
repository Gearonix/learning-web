const webpush = require('web-push');
const app = require('express')()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4173'}))

// const vapidKeys = webpush.generateVAPIDKeys()

const vapidKeys = {
    publicKey: 'BGRk5uAAX7WLhI8BPETz-cQ4xdO_B0UKZFmzSe3AOjiyNPEDpY7h7Bg5vhN4s53_fDhYp6Izud_XlNCS_r7PoXg',
    privateKey: 'YinKcOOxeyJksi8CZyZg65jFINsr-6q18mlAD9Nwfn4'
}

webpush.setVapidDetails(
    'mailto:egor.uzhanin@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
//
// const pushSubscription = {
//     endpoint: 'https://gearonixx.com',
//     keys: {
//         auth: '.....',
//         p256dh: '.....'
//     }
// };
//
// webpush.sendNotification(pushSubscription, 'Your Push Payload Text');

const publicKey = vapidKeys.publicKey

console.log(publicKey)
console.log(vapidKeys.privateKey)

app.post('/subscribe', (req,res) => {
    res.status(201).json({})
    const payload = JSON.stringify({title: 'Test'})
    console.log(req.body)
    webpush.sendNotification(req.body, payload)
        .catch((err) => {
            console.log(err)
        })
})


app.listen(6868, () => console.log('Server started'))
