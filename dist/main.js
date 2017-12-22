console.log("main.js file loaded");

var allowConsole = true;
var audiocontext, audiocontext2;
var bufferSize = 512;
var socket;
var packet_count = 0;
var encodeFactor = 10**19;

try{
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	audiocontext = new AudioContext();
	audiocontext2 = new AudioContext();
}
catch(e){
	alert("Audio Context not Supported.");
	audiocontext = false;
	audiocontext2 = false;
}

var socket = io();

function printLog(xyz)
{
	if(allowConsole)
		console.log(xyz);
}