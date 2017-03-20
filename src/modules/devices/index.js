const updateDevice = ({state, props}) => {
  //console.info(props.device,props.value)
  state.set(`devices.${props.device}`,props.value)
}

export default {
  state: {
    esp01: 0,
    JustLED: 0,
    PoeticNinja: 0,
    'pp-bot': 0
  },
  signals: {
    deviceDataReceived: updateDevice
  }
}
