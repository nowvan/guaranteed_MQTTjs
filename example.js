var mqtt = require('./')
var client = mqtt.connect('mqtt://localhost', {reconnectPeriod: 3000000, connectTimeout: 30000000, clean: false, clientId: 'mqttjs_aaa'})

client.on('connect', function () {
  client.subscribe({'test1': {qos: 2}}, function (err) {
    if (!err) {
      setTimeout(() => { client.publish('test1', 'Hello mqtt', {qos: 2}) }, 3000)
    }
  })
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})
