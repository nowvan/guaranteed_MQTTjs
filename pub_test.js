let mqtt = require('./')
let client = mqtt.connect('mqtt://localhost', {
  protocolVersion: 5,
  reconnectPeriod: 30000000,
  connectTimeout: 30000000,
  keepalive: 0,
  clean: false,
  clientId: 'mqttjs_pub',
  properties: {
    sessionExpiryInterval: parseInt('0xFFFFFFFF', 16),
    // receiveMaximum: 432,
    // maximumPacketSize: 100,
    // topicAliasMaximum: 456,
    // receiveMaximum: 432,
    requestResponseInformation: true,
    // requestProblemInformation: true
    userProperties: {
      test: 'test'
    }
  }
})

client.on('connect', function (connack) {
  if (connack) {
    console.log('connack', connack)
  }
  // client.subscribe(connack.properties.responseInformation, {qos: 1})
  let opt = {qos: 2,
    retain: true,
    properties: {
      responseTopic: connack.properties.responseInformation,
      correlationData: Buffer.from([1, 2, 3, 4]),
      userProperties: {
        e2eCount: 1,
        retainLimit: 20 } } }
  client.publish('test', 'Hello mqtt e2e 1', opt)
  // client.publish('test', 'Hello mqtt e2e 2', opt)
  // client.publish('test', 'Hello mqtt e2e 3', opt)
  // setTimeout(() => { client.publish('test', 'Hello mqtt e2e', opt) }, 3000)
  // setTimeout(() => { client.publish('test', 'Hello mqtt e2e', opt) }, 6000)
})

client.on('message', function (topic, message, packet) {
  console.log(message.toString())
  console.log(packet)
})
