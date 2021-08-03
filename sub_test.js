let mqtt = require('./')
let client = mqtt.connect('mqtt://localhost', {
  protocolVersion: 5,
  reconnectPeriod: 3000000,
  connectTimeout: 30000000,
  keepalive: 0,
  clean: false,
  clientId: 'mqttjs_sub',
  properties: {
    sessionExpiryInterval: parseInt('0xFFFFFFFF', 16),
    // receiveMaximum: 432,
    // maximumPacketSize: 100,
    // topicAliasMaximum: 456,
    // requestResponseInformation: true,
    // requestProblemInformation: true,
    userProperties: {
      test: 'test'
    }
  }
})

client.on('connect', function (connack) {
  if (connack) {
    console.log('connack', connack)
  }
  let opt = {qos: 2,
    properties: {
      userProperties: {
        e2e: true,
        retainCount: 20
      }
    }
  }
  client.subscribe({'test1': {qos: 2}}, opt
    // ,function (err) {
    // if (!err) {
    //   setTimeout(() => { client.publish('test1', 'Hello mqtt', {qos: 2}) }, 3000)
    // }
    // }
  )
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})
