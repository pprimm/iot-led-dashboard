import mqtt from 'mqtt'

// We create a factory, allowing you to pass in options to it
function MQTTProviderFactory (options = {}) {
  console.info('MQTTProviderFactory() called')
  // We use a variable to cache the created provider
  let cachedProvider = null

  // This is the function that creates the provider,
  // typically just an object with some methods
  function createProvider (context) {
    console.info('createProvider() called')
    const mqttClient = mqtt.connect('ws://localhost:8083/mqtt', {keepAlive: 1})
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

    const botNameRegex = /get\/bots\/(.*)\/(.*)/

    const dataReceived = context.controller.getSignal('devices.deviceDataReceived')
    const uiDefReceived = context.controller.getSignal('display.uiDefReceived')

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

    return mqttClient
  }

  // The function that is run by Cerebral, providing the context
  // for you to attach your provider to
  function MQTTProvider (context) {
    console.info('MQTTProvider() called')
    context.mqtt = cachedProvider = (cachedProvider || createProvider(context))

    // You can wrap the provider with the debugger
    // to show information about its usage in the debugger
    if (context.debugger) {
      context.debugger.wrapProvider('mqtt')
    }

    // Always return the context after mutating it
    return context
  }

  return MQTTProvider
}

export default MQTTProviderFactory