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
  providers: [MQTTProvider()]
})

export default controller
