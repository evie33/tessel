const climate = require('./climate/climate');
const accel = require('./accelerometer');

climate();
accel();
console.log('climate', climate(), 'accel', accel())
