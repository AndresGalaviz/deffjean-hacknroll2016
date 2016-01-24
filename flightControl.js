var Cylon = require('cylon');

Cylon.robot({
	connections: {
		leapmotion: {adaptor: 'leapmotion'},
		ardrone: { adaptor: 'ardrone', port: '192.168.1.1' }
	},

	devices: {
		leapmotion: {driver: 'leapmotion', connection: 'leapmotion'},
		drone: {driver: 'ardrone', connection: 'ardrone'}
	},

	work: function(my){
		var onFlight = false;
		var stop = false;
		var active = true;

		my.leapmotion.on('frame', function(frame){
			var hand = frame.hands[0];
			if(frame.hands.length > 0) {
				if(hand.timeVisible > 4) {
					// var im = my.drone.getPngStream()
					// console.log(im);
					var position = hand.palmPosition;
					var velocity = hand.palmVelocity;
					var direction = hand.direction;
					var normal = hand.palmNormal;
					
					stop = true;
					// TODO: Make continuos
					if(position[1] > 280) {
						console.log("UP " + ((position[1] - 280)/100));
						stop = false;
						active = true;
						my.drone.up((position[1] - 280)/100);
					} else if(position[1] < 120) {
						console.log("DOWN " + (Math.abs(position[1] - 120)/100));
						stop = false;
						active = true;
						my.drone.down(Math.abs(position[1] - 120)/100);
					} else {
						if(normal[2] > 0.2) {
							console.log("FRONT " + (normal[2] - 0.2));
							stop = false;
							active = true;
							my.drone.front(normal[2] - 0.2);
						} else if(normal[2] < -0.35) {
							console.log("BACK " + (Math.abs(normal[2]) - 0.35));
							stop = false;
							active = true;
							my.drone.back(Math.abs(normal[2]) - 0.35);
						} 
						if(normal[0] > 0.3) {
							console.log("LEFT " + (normal[0] - 0.3));
							stop = false;
							active = true;
							my.drone.left(normal[0] - 0.3);

						} else if(normal[0] < -0.3) {
							console.log("RIGHT " + (Math.abs(normal[0]) - 0.3));
							stop = false;
							active = true;
							my.drone.right(Math.abs(normal[0]) - 0.3);
						} 

					} 	
					if(stop && active) {
						console.log("Stop");
						my.drone.up(0);
						my.drone.down(0);
						my.drone.front(0);
						my.drone.back(0);
						my.drone.left(0);
						my.drone.right(0);
						my.drone.clockwise(0);
						my.drone.counterClockwise(0);
						stop = false;
						active = false;
					}	
				} else if(hand.timeVisible > 0.5) {
					if(!onFlight){
						console.log("Take off");
						my.drone.takeoff();	
						onFlight = true;
					}
					
				}
			} else if(frame.hands.length == 0){
				
				
				if(onFlight){
					console.log("Landing");	
					my.drone.land();
					onFlight = false;
				}
			}

			
		})

	}
}).start();