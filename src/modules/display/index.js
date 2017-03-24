const togglePotDisplay = ({state, props}) => {
  state.set('display.showPotValues',!state.get('display.showPotValues'))
}

export default {
  state: {
    showPotValues: false,
    items: [
      {
        label: 'esp01',
        topic: 'esp01'
      }, {
        label: 'JustLED',
        topic: 'JustLED'
      },
      {
        label: 'PoeticNinja',
        topic: 'PoeticNinja'
      }, {
        label: 'pp-bot',
        topic: 'pp-bot'
      }
    ]
  },
  signals: {
    showPotSelected: togglePotDisplay
  }
}
