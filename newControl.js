var Cylon = require('cylon');


Cylon.robot({

	connections: {
	    leapmotion: { adaptor: 'leapmotion' },
	    ardrone: { adaptor: 'ardrone', port: '192.168.1.1' },
	    keyboard: { adaptor: 'keyboard' }
	},

	devices: {
	    drone: { driver: 'ardrone', connection:'ardrone' },
	    leapmotion: { driver: 'leapmotion', connection:'leapmotion' },
	    keyboard: { driver: 'keyboard', connection:'keyboard' }
	},

	work: function(my) {

		my.leapmotion.on('gesture', function(gesture) {
	        if (gesture.type=='circle' && gesture.state=='stop' && gesture.progress > CIRCLE_THRESHOLD ){
	            if (gesture.normal[2] < 0) {
	                my.drone.takeoff();
	            };

	            if (gesture.normal[2] > 0) {
	                my.drone.land();
	            }
	        }
	    });

      	my.leapmotion.on('hand', function(hand) {

      		if(hand.s>1.5 && Math.abs(handStartDirection[0]-hand.direction[0]) > TURN_TRESHOLD ) {
		        var signal = handStartDirection[0]-hand.direction[0];
		        var value = (Math.abs(handStartDirection[0]-hand.direction[0])-TURN_TRESHOLD) * TURN_SPEED_FACTOR;
		        if (signal>0){
		            my.drone.counterClockwise(value);
		        }

		        if (signal<0){
		            my.drone.clockwise(value);
		        }      
		    }

			if (hand.s>1.5 && Math.abs(hand.palmPosition[1]-handStartPosition[1]) > UP_CONTROL_THRESHOLD) {    
		        var signal = (hand.palmPosition[1]-handStartPosition[1]) >= 0 ? 1 : -1;
		        var value = Math.round(Math.abs((hand.palmPosition[1]-handStartPosition[1]))-UP_CONTROL_THRESHOLD) * UP_SPEED_FACTOR;

		        if (signal>0) {
		            my.drone.up(value);
		        };

		        if (signal<0) {
		            my.drone.down(value);
		        }
		    }

		    if (hand.s>1.5 && (Math.abs(hand.palmNormal[2])>DIRECTION_THRESHOLD)) {
		        if (hand.palmNormal[2]>0) {
		            var value = Math.abs(Math.round( hand.palmNormal[2] * 10 + DIRECTION_THRESHOLD ) * DIRECTION_SPEED_FACTOR);
		            my.drone.forward( value );
		        };
		    
		        if (hand.palmNormal[2]<0) {
		            var value = Math.abs(Math.round( hand.palmNormal[2] * 10 - DIRECTION_THRESHOLD ) * DIRECTION_SPEED_FACTOR);
		            my.drone.back( value );
		        };
		    } 

		    if (hand.s>1.5 && (Math.abs(hand.palmNormal[0])>DIRECTION_THRESHOLD)) {
		        if (hand.palmNormal[0]>0) {
		            var value = Math.abs(Math.round( hand.palmNormal[0] * 10 + DIRECTION_THRESHOLD ) * DIRECTION_SPEED_FACTOR);
		            my.drone.left( value );
		        };
		    
		        if (hand.palmNormal[0]<0) {
		            var value = Math.abs(Math.round( hand.palmNormal[0] * 10 - DIRECTION_THRESHOLD ) * DIRECTION_SPEED_FACTOR);
		            my.drone.right( value );
		        };
		    }

		    if (hand.s<=1.5 && lastS > 1.5) { // closed hand
		        my.drone.stop();
		    }

		    my.keyboard.on('right', function(key) { 
		        my.drone.rightFlip();
		    });

		    my.keyboard.on('left', function(key) { 
		        my.drone.leftFlip();
		    });

		    my.keyboard.on('up', function(key) { 
		        my.drone.frontFlip();
		    });

		    my.keyboard.on('down', function(key) { 
		        my.drone.backFlip();
		    });
		
		})
	}
}).start();





