const updateDevice = ({state, props}) => {
  //console.info(props.device,props.value)
  state.set(`devices.${props.device}`,props.value)
}

export default {
  state: {},
  signals: {
    deviceDataReceived: updateDevice
  }
}
