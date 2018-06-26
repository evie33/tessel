// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/

var tessel = require('tessel');
var climatelib = require('climate-si7020');
var accellib = require('accel-mma84')

var climate = climatelib.use(tessel.port['B']);
var accel = accellib.use(tessel.port['A']);

climate.on('ready', function () {
 console.log('Connected to climate module');

 // Loop forever
 setImmediate(function loop () {
   climate.readTemperature('f', function (err, temp) {
     climate.readHumidity(function (err, humid) {
     console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
     setTimeout(loop, 300);
     });
   });
 });
});

climate.on('error', function(err) {
 console.log('error connecting module', err);
});



// Initialize the accelerometer.
accel.on('ready', function () {
// Stream accelerometer data
accel.on('data', function (xyz) {
 console.log('x:', xyz[0].toFixed(2),
   'y:', xyz[1].toFixed(2),
   'z:', xyz[2].toFixed(2));
});

});

accel.on('error', function(err){
 console.log('Error:', err);
});
