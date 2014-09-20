var telnet = require('net')

//set default values
var gpsData = require('./gps.json')
var gpsCoordinates = gpsData.data 
var gpsFrequency = gpsData.frequency || 3000

//configured for android use
var client = telnet.connect('5554', 'localhost')

var startPolling = function() {

    //cycle through list sending gps to android emulator
    setInterval(function() {
        elem = gpsCoordinates.shift()
        console.log(elem)
        console.log('geo fix ' + elem.lon + ' ' + elem.lat)
        client.write('geo fix ' + elem.lon + ' ' + elem.lat + '\n')
        gpsCoordinates.push(elem)

    }, 3000)
}

//after the first set of data is received
client.on('data', function(data) {
    console.log(data.toString())

}).on('connect', function() {
    startPolling()
    console.log("connected")
}).on('end', function() {
    console.log('disconnected')
});
