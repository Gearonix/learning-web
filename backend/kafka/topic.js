//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs')

run()
async function run() {
  console.log('docker-test')
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['kafka:29092', 'kafka2:29093']
    })

    const admin = kafka.admin()
    console.log('Connecting.....')
    const connection = await admin.connect()
    console.log('Connected!')

    //A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: 'Users2',
          numPartitions: 2
        }
      ]
    })
    console.log('Created Successfully!')
    await admin.disconnect()
  } catch (error) {
    console.error(`Something bad happened ${error}`)
  } finally {
    process.exit(0)
  }
}
