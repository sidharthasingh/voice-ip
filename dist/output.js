/*

	Playing audio from sample.mp3
	NOTE :  Working

*/

// finishedLoading = function(bufferList)
// {
// 	source = audiocontext.createBufferSource();
// 	source.buffer = bufferList[0];
// 	source.connect(audiocontext.destination);
// 	source.start();
// }

// if(false != audiocontext)
// {
// 	bufferLoader = new BufferLoader(
// 							audiocontext,
// 							["/dist/sample.mp3"],
// 							finishedLoading);
// 	bufferLoader.load();
// }

function playSound(soundBuffer)
{

	temp = [];
	for(i=0;i<soundBuffer.length;i++)
	{
		temp[i] = 2*[(soundBuffer[i])/encodeFactor];
	}
	soundBuffer = Float32Array.from(temp);
	buff = audiocontext2.createBuffer(1, audiocontext.sampleRate * 3, audiocontext.sampleRate);
// 	for (var channel = 0; channel < buff.numberOfChannels; channel++) {
//   // This gives us the actual ArrayBuffer that contains the data
//   var nowBuffering = buff.getChannelData(channel);
//   console.log("length : "+buff.length+" - "+buff.numberOfChannels);
//   continue;
//   for (var i = 0; i < buff.length; i++) {
//     // Math.random() is in [0; 1.0]
//     // audio needs to be in [-1.0; 1.0]
//     nowBuffering[i] = Math.random() * 2 - 1;
//   }
// }
	// console.log(soundBuffer);
	buff.copyToChannel(soundBuffer,0);

	source = audiocontext2.createBufferSource();
	// source.buffer = bufferList[0];
	source.buffer = buff;
	source.connect(audiocontext2.destination);
	source.start();
}
socket.on("sound",function(msg){
	console.log("R P : "+msg.pkt_id);
	setTimeout(playSound(msg.sound),0);
});