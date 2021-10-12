const { Kafka } = require('kafkajs')

const APP_NAME = process.env.APP_NAME || 'kafka-browser-graphql'
const KAFKA_BROKERS = JSON.parse(process.env.KAFKA_BROKERS || '["localhost:9092"]')
const CONNECTION_TIMEOUT = +(process.env.CONNECTION_TIMEOUT || '1000')
const REQUEST_TIMEOUT = +(process.env.REQUEST_TIMEOUT || '30000')

const client = new Kafka({
  clientId: APP_NAME,
  brokers: KAFKA_BROKERS,
  connectionTimeout: CONNECTION_TIMEOUT,
  requestTimeout: REQUEST_TIMEOUT
})

console.log(`Kafka client initialized: ${!!client}.\nBrokers: ${KAFKA_BROKERS.join(',')}`)

const dataPath = process.env.DATA_PATH || "/var/tmp/kafka-browser-graphql"

module.exports = {
  kafka: client,
  dataPath
}
