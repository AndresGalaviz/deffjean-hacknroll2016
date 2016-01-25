Intuitive control of a AR Drone 2.0 with help of the leap motion and Raspberry Pi to broadcast a live video feed. A client fetches the images from the Pi and shows them in a web app (work on face recognition in progress). 

### Stuff needed
* AR Drone 2.0
* Leap Motion device
* Raspberry PI 2.0 with a camera module, wi-fi dongle and a powerbank for the power.
* Duck tape to mount it onto the drone.
* Two computers communicating with PI and Drone (we call them Client and Server respectively). Also possible with one computer and two network cards.

#### Client:

1. Install packages with ```npm install```
2. Run local server with ```grunt server```

#### Server:

1. Install node
2. Run ```node robot.js``` when connected to drone

#### For Raspberry PI
1. Install RPi Cam Web Interface, instruction available [here](http://www.sitepoint.com/streaming-a-raspberry-pi-camera-into-vr-with-javascript/) 
