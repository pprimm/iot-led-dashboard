import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import devices from './modules/devices'
import display from './modules/display'
import MQTTProvider from './MQTTProvider'

const controller = Controller({
  devtools: Devtools({
    remoteDebugger: 'localhost:8585'
  }),
  modules: {
    devices,
    display
  },
  providers: [
    MQTTProvider({
      mqttUrl: 'ws://localhost:8083/mqtt',
      mqttOptions: {keepAlive: 1},
      botsMqttTopic: 'get/bots/+/#',
      displayMqttTopic: 'get/ui/display',
      deviceUpdateSignalPath: 'devices.deviceDataReceived',
      displayDefinitionPath: 'display.uiDefReceived'
    })
  ]
})

controller.on('initialized', () => {
  console.info('Cerebral Controller initialized; THIS DOESN\'T FIRE')
})

export default controller
