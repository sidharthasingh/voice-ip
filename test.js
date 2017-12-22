var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/",function(req,res){
	console.log("/test works!");
	res.send("/test works!");
});

router.get("/home",function(req,res){
	res.sendFile(path.join(__dirname,'dist/index.html'));
});

module.exports = router;