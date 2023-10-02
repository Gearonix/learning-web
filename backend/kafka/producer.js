//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs')

const msg = process.argv[2] || 'Adam'

console.log(msg)
run()
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['kafka:29092', 'kafka2:29093']
    })

    const producer = kafka.producer()
    console.log('Connecting.....')
    await producer.connect()
    console.log('Connected!')
    //A-M 0 , N-Z 1
    const partition = msg[0] < 'N' ? 0 : 1
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition
        }
      ]
    })

    console.log(`Send Successfully! ${JSON.stringify(result)}`)
    await producer.disconnect()
  } catch (error) {
    console.error(`Something bad happened ${error}`)
  } finally {
    process.exit(0)
  }
}
