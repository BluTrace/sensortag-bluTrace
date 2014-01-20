var util = require('util');

var async = require('async');

var SensorTag = require('sensortag');

SensorTag.discover(function(sensorTag) {

  sensorTag.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  async.series([
      function(callback) {
        console.log('connect');
        sensorTag.connect(callback);
      },
      function(callback) {
        console.log('discoverServicesAndCharacteristics');
        sensorTag.discoverServicesAndCharacteristics(callback);
      },
      function(callback) {
        console.log('enableMagnetometer');
        sensorTag.enableMagnetometer(callback);
      },
      function(callback) {
	sensorTag.setMagnetometerPeriod(200,callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },

      function(callback) {
        console.log('readMagnetometer');
        sensorTag.readMagnetometer(function(x, y, z) {
          console.log('\tx = %d μT', x.toFixed(1));
          console.log('\ty = %d μT', y.toFixed(1));
          console.log('\tz = %d μT', z.toFixed(1));

          callback();
        });
      },
 
     function(callback) {
        console.log('magnetometerChange');
        
	sensorTag.on('magnetometerChange', function(x, y,z) {
	   console.log('\tx = %d μT', x.toFixed(1));
           console.log('\ty = %d μT', y.toFixed(1));
           console.log('\tz = %d μT', z.toFixed(1));

	 });

        sensorTag.notifyMagnetometer(function() {
        });
      },

      function(callback) {	
        console.log('disableMagnetometer');
        sensorTag.disableMagnetometer(callback);
      }
    ]
  );
});

