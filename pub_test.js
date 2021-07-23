var mqtt = require('./')
var client = mqtt.connect('mqtt://localhost', {
  protocolVersion: 5,
  reconnectPeriod: 3000000,
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
  let opt = {qos: 2,
    properties: {
      responseTopic: connack.properties.responseInformation,
      correlationData: Buffer.from([1, 2, 3, 4]),
      userProperties: {
        e2eCount: 1,
        retainLimit: 20
      }
    }
  }
  client.publish('test1', 'Hello mqtt', opt)
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})
