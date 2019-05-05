const Discord = require("discord.js");
var client = new Discord.Client();
var delay = 3600000;
const snoowrap = require("snoowrap");
const r = new snoowrap({
  userAgent: process.env.USERAGENT,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRECT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});
var emc = "0x00FFFF";
var logc = process.env.LOGC;
var guildlist = process.env.TARCHAN;


client.on('error', function(){
	console.log("ERROR");
	console.error;
});

client.on("ready", function(){
	console.log("\n\n");
  console.log("Bot successfully started")
  client.user.setActivity("Hentai", {type: "WATCHING"})
	console.log("\n\n");

  function postHentai() {
    function topP(subreddit){
      const sub = r.getSubreddit(subreddit);
      return sub.getTop({time: "day"});
    }
    function chansend(posts) {
      if(posts.length > 0) {
        var currentdate = new Date();
        var datetime = "[" + currentdate.getDate() + "." + (currentdate.getMonth()+1) + "." + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "]";
        for(i=0; i<guildlist.length; i++) {
          client.channels.get(guildlist[i]).send(`"${posts[0].title}" ${posts[0].url}\n→ https://reddit.com${posts[0].permalink}`);
        }
        console.log(`${datetime} Posted new image → ${posts[0].title} https://reddit.com${posts[0].permalink}`);
        setTimeout(() => {
          const tail = posts.splice(1);
          chansend(tail);
        }, delay);
      }
    }
    topP("hentai")
      .then(res => chansend(res))
      .catch(console.error);
  }

  postHentai();

});

client.on("message", msg => {

  var attachar = (msg.attachments).array();

  var currentdate = new Date();
  var datetime = "[" + currentdate.getDate() + "." + (currentdate.getMonth()+1) + "." + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "]";

  const logem = new Discord.RichEmbed()
    .setColor(emc)
    .setAuthor(msg.author.tag, msg.author.avatarURL)
    .setTitle(datetime)
    .setDescription(msg.content)
    .setFooter(`MSG ID: ${msg.id} | AUTH ID: ${msg.author.id}`)

  if(msg.author == client.user) return;
  if(msg.content.toLowerCase() == "ayy") {
    msg.channel.send("lmao");
  }else{
    if(msg.guild === null){
      if(msg.attachments.size > 0) {
          if(attachar[0].url.toLowerCase().endsWith(".png") || attachar[0].url.toLowerCase().endsWith(".jpg") || attachar[0].url.toLowerCase().endsWith(".gif") || attachar[0].url.toLowerCase().endsWith(".jpeg")){
            const logiem = new Discord.RichEmbed()
              .setColor(emc)
              .setAuthor(msg.author.tag, msg.author.avatarURL)
              .setTitle(datetime)
              .setDescription(`${msg.content}`)
              .setImage(attachar[0].url)
              .setFooter(`MSG ID: ${msg.id} | AUTH ID: ${msg.author.id}`)
            client.channels.get(logc).send(logiem);
          }else{
            const logoem = new Discord.RichEmbed()
              .setColor(emc)
              .setAuthor(msg.author.tag, msg.author.avatarURL)
              .setTitle(datetime)
              .setDescription(`"${msg.content}"\n${attachar[0].url}`)
              .setFooter(`MSG ID: ${msg.id} | AUTH ID: ${msg.author.id}`)

            client.channels.get(logc).send(logoem)
          }
          msg.channel.send(`Be careful what you write here all messages outside of servers are getting logged!\nIf you wrote something private, dont worry the logs are kept secret and won't be used for anything.\nThis bot was made by @suretic / suretic#5364`);
        }else{
          client.channels.get(logc).send(logem);
          msg.channel.send(`Be careful what you write here all messages outside of servers are getting logged!\nIf you wrote something private, dont worry the logs are kept secret and won't be used for anything.\nThis bot was made by @suretic / suretic#5364`);
        }
      }
    }
  //}

});

client.login(process.env.BOT_TOKEN);
