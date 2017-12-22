function myPCMFilterFunction(inputSample) {
  return inputSample*2;// + noiseSample * 0.1;  // For example, add noise samples to input.
}


// Check if there is microphone input.
try {
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;
  var hasMicrophoneInput = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
} catch(e) {
  alert("getUserMedia() is not supported in your browser");
}

xyz = 0;
// Create a pcm processing "node" for the filter graph.
var myPCMProcessingNode = audiocontext.createScriptProcessor(bufferSize, 1, 1);
myPCMProcessingNode.onaudioprocess = function(e) {
  var input = e.inputBuffer.getChannelData(0);
  var output = e.outputBuffer.getChannelData(0);
  // if(xyz >10)
  //   return;
  // console.log(e.outputBuffer);
  // xyz++;
  for (var i = 0; i < bufferSize; i++) {
     // Modify the input and send it to the output.
     output[i] = myPCMFilterFunction(input[i]);
     if(i==bufferSize-1)
     {
     	// console.log(output)
      temp = [];
      for(i=0;i<bufferSize;i++)
        temp[i] = output[i]*encodeFactor;
     	packet_count++;
      obj = {
        user_id:0,
        pkt_id:packet_count,
        sound:temp
      }
     	socket.emit("sound",obj);
      console.log("S P : "+packet_count);
      // console.log(temp);
     	for(i=0;i<bufferSize;i++)
     		output[i] = 0; // Mute the user's device
     }
  }
}

var errorCallback = function(e) {
  alert("Error in getUserMedia: " + e);
  console.log(e);
};  

// Get access to the microphone and start pumping data through the  graph.
navigator.getUserMedia({audio: true}, function(stream) {
  // microphone -&gt; myPCMProcessingNode -&gt; destination.
  var microphone = audiocontext.createMediaStreamSource(stream);
  microphone.connect(myPCMProcessingNode);
  myPCMProcessingNode.connect(audiocontext.destination);
  //microphone.start(0);
}, errorCallback);