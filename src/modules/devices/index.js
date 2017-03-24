const updateDevice = ({state, props}) => {
  //console.info(props.device,props.valueName,props.value)
  let updatedValue = {}
  switch (props.valueName) {
    case 'led':
      updatedValue = { ledValue: props.value }
      break
    case 'pot':
      updatedValue = { potValue: props.value }
      break
    default:
      updatedValue = { unexpected: props.value }
  }
  state.merge(`devices.${props.device}`, updatedValue)
}

export default {
  state: {
  },
  signals: {
    deviceDataReceived: updateDevice
  }
}
