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
		my.leapmotion.on('frame', function(frame){
			var hand = frame.hands[0];
			if(frame.hands.length > 0 && hand.timeVisible > 1){
				my.drone.takeoff();
				
				var position = hand.palmPosition;
				var velocity = hand.palmVelocity;
				var direction = hand.direction;
				var normal = hand.palmNormal;
				// TODO: Make continuos
				if(position[1] > 280) {
					console.log("UP");
					my.drone.up(0.1);
				} else if(position[1] < 120) {
					console.log("DOWN");
					my.drone.down(0.1);
				} else {
				
					if(normal[2] > 0.1) {
						
						console.log("Front")
						my.drone.forward(0.1);
					} else if(normal[2] < -0.3) {
						
						console.log("Back");
						my.drone.back(0.1);
					} 
					if(normal[0] > 0.3) {
						console.log("Left")
						my.drone.left(0.1);

					} else if(normal[0] < -0.3) {
						console.log("Right")
						my.drone.right(0.1);
					}
				}
			} else if(frame.hands.length == 0){
				my.drone.land();
			}

			
			

			// if(frame.valid && frame.gestures.length > 0){
			// 	frame.gestures.forEach(function(g){
			// 		if(g.type == 'swipe'){
			// 			var currentPosition = g.position;
			// 			var startPosition = g.startPosition;

			// 			var xDirection = currentPosition[0] - startPosition[0];
			// 			var yDirection = currentPosition[1] - startPosition[1];
			// 			var zDirection = currentPosition[2] - startPosition[2];

			// 			var xAxis = Math.abs(xDirection);
			// 			var yAxis = Math.abs(yDirection);
			// 			var zAxis = Math.abs(zDirection);

			// 			var superiorPosition  = Math.max(xAxis, yAxis, zAxis);

			// 			if(superiorPosition === xAxis){
			// 				if(xDirection < 0){
			// 					console.log('LEFT');
			// 					my.drone.left(1);
			// 				} else {
			// 					my.drone.right(1);
			// 					console.log('RIGHT');
			// 				}
			// 			}

			// 			if(superiorPosition === zAxis){
			// 				if(zDirection > 0){
			// 					console.log('BACKWARDS');
			// 					my.drone.back(1);
			// 				} else {
			// 					console.log('FORWARD');
			// 					my.drone.forward(1);
			// 				}
			// 			}

			// 			if(superiorPosition === yAxis){
			// 				if(yDirection > 0){
			// 					console.log('UP');
			// 					my.drone.up(1);
			// 				} else {
			// 					console.log('DOWN');
			// 					my.drone.down(1);
			// 				}
			// 			}
			// 		} else if(g.type === 'keyTap'){
			// 			my.drone.backFlip();
			// 			after((5).seconds(), function(){
			// 				my.drone.land();
			// 			})
			// 		}
			// 	})
			// }
		})
	}
}).start();