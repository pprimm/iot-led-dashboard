import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import devices from './modules/devices'
import display from './modules/display'
import mqtt from 'mqtt'

const controller = Controller({
  devtools: Devtools({
  remoteDebugger: '10.10.10.101:8585'
  }),
  modules: {
    devices,
    display
  }
})

const mqttClient = mqtt.connect('ws://10.10.10.101:8083/mqtt', {keepAlive: 1})

const BOTS_TOPIC = 'get/bots/+/#'
const DISPLAY_TOPIC = 'set/ui/display'

mqttClient.on('connect', function (err) {
  console.info('MQTT: Connected')
  mqttClient.subscribe(BOTS_TOPIC)
  mqttClient.subscribe(DISPLAY_TOPIC)
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

const botNameRegex = /get\/bots\/(.*)\/(.*)/

const dataReceived = controller.getSignal('devices.deviceDataReceived')
const uiDefReceived = controller.getSignal('display.uiDefReceived')

mqttClient.on('message', function (topic, message) {
  topic.replace(botNameRegex, function (match, deviceName, valueName) {
    let value = parseInt(message, 10)
    if (value < 0) { value = 0 } else if (value > 100) { value = 100 }
    dataReceived({device: deviceName, valueName: valueName, value: value})
  })
  if (topic === DISPLAY_TOPIC) {
    const msg = message.toString()
    uiDefReceived(JSON.parse(msg))
  }
})

export default controller
