let mqtt = require('./')
let client = mqtt.connect('mqtt://localhost', {
  protocolVersion: 5,
  reconnectPeriod: 500 * 1000,
  connectTimeout: 30000000,
  keepalive: 7000,
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
    rh: 1,
    properties: {
      userProperties: {
        e2e: true,
        retainCount: 20 } } }
  client.subscribe('test', opt)
})

client.on('message', function (topic, message, packet) {
  console.log(message.toString(), packet)
})
