/* eslint-disable linebreak-style */
/**
 * Created by Andrew D.Laptev<a.d.laptev@gmail.com> on 1/21/15.
 */

var CAMERA_HOST = '192.168.1.91',
	USERNAME = 'admin',
	PASSWORD = 'admin',
	PORT = 80;

var http = require('http'),
	Cam = require('./lib/onvif').Cam;


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
	this.getVideoSources((err,videoSources,xml)=>{
		console.log("videoSources")
		console.log(videoSources)
		console.log("xml")
		console.log(xml)
		// this.getImagingSettings({token:})
		videoSources.forEach((source)=>{
			let token = source['$'].token
			this.setImagingSettings({
				token: token,
				wideDynamicRange: 'OFF',
				brightness: 50
			});
			this.getImagingSettings({token: token}, (err, data)=>{
				console.log("getImagingSettings data")
				console.log(data)
			});

		})
	})
	// this.getImagingSettings({token:})
	// this.absoluteMove({
	// 	x: 1
	// 	, y: 1
	// 	, zoom: 1
	// });
	// this.getStreamUri({protocol:'RTSP'}, function(err, stream) {
	// 	http.createServer(function (req, res) {
	// 		res.writeHead(200, {'Content-Type': 'text/html'});
	// 		res.end(
	// 			'<html><body>' +
	// 			'<embed type="application/x-vlc-plugin" target="' + stream.uri + '"></embed>' +
	// 			'</boby></html>');
	// 	}).listen(3030);
	// });
});