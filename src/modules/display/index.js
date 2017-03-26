const togglePotDisplay = ({state, props}) => {
  state.set('display.showPotValues',!state.get('display.showPotValues'))
}

const updateUIDef = ({state, props}) => {
  state.set('display.items',props.items)
}

export default {
  state: {
    showPotValues: false,
    items: []
  },
  signals: {
    showPotSelected: togglePotDisplay,
    uiDefReceived: updateUIDef
  }
}
