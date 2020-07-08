/* eslint-disable linebreak-style */
/**
 * Created by Jason LI 2020/07/08 program would get the current WDR setting and
 * switch to the opposite. e.g. from 'ON' to 'OFF'
 */

var CAMERA_HOST = '192.168.1.89',
	USERNAME = 'admin',
	PASSWORD = 'admin',
	PORT = 80,
	wideDynamicRange; // = 'ON' or 'OFF' force the camera set to 'ON' or 'OFF'

var currentWDR;

var http = require('http'),
	Cam = require('./lib/onvif').Cam;


function switchWDR(cWDR){
	if (wideDynamicRange){
		return wideDynamicRange
	}
	if (cWDR == 'ON'){
		return 'OFF'
	}
	return 'ON'
}

new Cam({
	hostname: CAMERA_HOST,
	username: USERNAME,
	password: PASSWORD,
	port: PORT
}, function(err) {
	if (err) {
		console.log('Connection Failed for ' + CAMERA_HOST + ' Port: ' + PORT + ' Username: ' + USERNAME + ' Password: ' + PASSWORD);
		return;
	}
	console.log('CONNECTED');
	let switchOnce = true;
	this.getVideoSources((err,videoSources,xml)=>{
		videoSources.forEach((source)=>{
			let token = source['$'].token
			this.getImagingSettings({token: token}, (err, data)=>{
				if (switchOnce){
					currentWDR = data.wideDynamicRange.mode
					console.log("wideDynamicRange switched from ", currentWDR, " to ", switchWDR(currentWDR))
					currentWDR = switchWDR(currentWDR);
					this.setImagingSettings({
						token: token,
						wideDynamicRange: currentWDR
					});
					switchOnce = false;
				}
			});
		})
	})
});
