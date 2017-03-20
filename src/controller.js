import {Controller} from 'cerebral'
import devices from './modules/devices'
import display from './modules/display'
import mqtt from 'mqtt'

const controller = Controller({
  modules: {
    devices,
    display
  }
})

const mqttClient = mqtt.connect('ws://10.10.101.31:8083/mqtt', {keepAlive: 1})

mqttClient.on('connect', function (err) {
  console.info('MQTT: Connected')
  mqttClient.subscribe('get/bots/+/led')
})

mqttClient.on('close', function (err) {
  console.warn('MQTT: Disconnected')
})

mqttClient.on('error', function (err) {
  console.warn('MQTT: ' + err)
})

mqttClient.on('reconnect', function (err) {
  console.info('MQTT: Reconnecting to MQTT Broker')
})

mqttClient.on('error', function (err) {
  console.warn('MQTT: Error talking to MQTT Broker')
})

const botNameRegex = /get\/bots\/(.*)\/led/

const dataReceived = controller.getSignal('devices.deviceDataReceived')

mqttClient.on('message', function (topic, message) {
  topic.replace(botNameRegex,
    function (match, botName) {
      let value = parseInt(message, 10)
      if (value < 0) { value = 0 } else if (value > 100) { value = 100 }
      dataReceived({device: botName, value: value})
    }
  )
})

export default controller
