const Discord = require("discord.js");
var express = require("express");
var fs = require("fs");
var client = new Discord.Client();
var app = express();

var port = process.env.PORT || 5000;
var uptime, mins, hrs;
uptime = mins = hrs = 0;
var time = "unable to connect to bot";
var stats = {
  "home": 0,
  "stats": 0,
  "team": 0,
  "contact": 0,
  "pgnf": 0,
  "msgcount": 0,
  "servers": 0,
  "channels": 0,
  "users": 0,
  "pmsg": 0
};
var teamf = JSON.parse(fs.readFileSync("./json/team.json", "utf-8"));

/* web server */

/* routes */

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index");
  stats["home"]++;
})

app.get("/stats", function(req, res) {
  res.render("stats", {"time":time, "stats":stats});
  stats["stats"]++;
})

app.get("/team", function(req, res) {
  var teamf = shrinkobj();
  res.render("team", {"teamf":teamf});
  stats["team"]++;
})

app.get("/team/:member", function(req, res) {
  var member = req.params.member;
  var meminf = getmeminf(member);
  if(meminf === null) {
    res.render("404");
  }else{
    res.render("teammember", {"meminf":meminf});
  }
  stats["team"]++;
})

app.post("/api/team/:member", function(req, res) {
  var member = req.params.member;
  var meminf = getmeminf(member);
  if(meminf === null) {
    res.status(404);
  }else{
    res.render("teampopup", {"meminf":meminf});
  }
})

app.get("/contact", function(req, res) {
  res.render("contact");
  stats["contact"]++;
})

app.get('*', function(req, res){
  res.status(404)
  res.render("404");
  stats["pgnf"]++;
});

app.listen(port, () => {
  console.log("web server started");
})

/* discord bot */

client.on('error', (e) =>{
	console.log(e);
	console.error;
});

client.on("ready", function(){
  console.log("bot started");
  setInterval( () => {
    stats["servers"] = client.guilds.size;
    stats["channels"] = client.channels.size;
    stats["users"] = client.users.size;
    uptime++;
    time = timeform();
  },1000);
})

client.on("message", msg => {
  if(msg.author == client.user) return;
  if(msg.guild === null){
    stats["pmsg"]++;
  }else{
    stats["msgcount"]++;
  }
})

client.login(process.env.BOT_TOKEN);

/* misc */

function timeform() {
  if(uptime >= 60){
    mins++;
    uptime = 0;
  }
  if(mins >= 60){
    hrs++;
    mins = 0;
  }
  if(hrs==0 && mins==0){
    time = uptime+"s";
  } else {
    if(hrs==0){
      time = mins+ "min " + uptime + "s";
    } else {
      time = hrs + "h " + mins + "min " + uptime + "s";
    }
  }
  return time
}

function shrinkobj() {
  var a = JSON.parse(fs.readFileSync("./json/team.json", "utf-8"));
  for(i=0;i<Object.keys(a).length;i++){
    if(a[i+1]["show"] === false) {
      delete a[i+1];
    }
  }
  for(i=0;i<Object.keys(a).length;i++){
    delete a[i+1]["github"];
    delete a[i+1]["twitter"];
    delete a[i+1]["youtube"];
    delete a[i+1]["discord"];
    delete a[i+1]["role"];
    delete a[i+1]["show"];
  }
  return a;
}

function getmeminf(member) {
  var x = Object.values(JSON.parse(fs.readFileSync("./json/team.json", "utf-8")));
  for(var i=0;i<x.length;i++) {
    if(x[i].name === member) {
      return(x[i]);
    }
  }
  return null;
}
