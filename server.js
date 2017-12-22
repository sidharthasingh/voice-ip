const express = require("express");
const bodyParser = require("body-parser");
var https = require("https");
var http = require("http");
const path = require("path");
var fs = require('fs');
// const api =require("./server/routes/api");
const test = require("./test");

const port = 8080;
const port_https = 8081;

const app = express();

http = http.Server(app);

var sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: "hello"
};
https = https.createServer(sslOptions, app);

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

// app.use('/api',api);
app.use('/test',test);

app.get("/dist/:filename",function(req, res){
	console.log("GET FILE "+req.params.filename);
	res.sendFile(path.join(__dirname,'dist/'+req.params.filename));
});

app.get("/",(req,res) => {
	console.log("GET REQUEST /");
	res.sendFile(path.join(__dirname,'dist/main.html'));
});

http
.listen(port,function(){
	console.log("HTTP  Server running on PORT:"+port);
})
.on("error",function(){
	"Unable to start HTTP server!";
});


https
.listen(port_https,function(){
	console.log("HTTPS Server running on PORT:"+port_https);
})
.on("error",function(){
	"Unable to start HTTPS server!";
});

var io1 = require('socket.io')(https);
var io2 = require('socket.io')(http);
sockFunc1 = (socket) => {
	console.log('User : CONNECTED');
  socket.on('disconnect', function(){
    console.log('User : DISCONNECTED');
  });
  socket.on("sound",function(msg){
  	console.log("U: " + msg.user_id+", P: "+msg.pkt_id);
  	io1.emit("sound",msg);
  	// Commented code can potentially hang the computer
  	// console.log(msg);
  	// process.exit(0);
  });
}
sockFunc2 = (socket) => {
	console.log('User : CONNECTED');
  socket.on('disconnect', function(){
    console.log('User : DISCONNECTED');
  });
  socket.on("sound",function(msg){
  	console.log("U: " + msg.user_id+", P: "+msg.pkt_id);
  	io2.emit("sound",msg);
  	// Commented code can potentially hang the computer
  	// console.log(msg);
  	// process.exit(0);
  });
}
io1.on('connection',sockFunc1);
io2.on('connection',sockFunc2);