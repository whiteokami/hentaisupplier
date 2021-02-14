const Discord = require("discord.js");
const futils = require("./modules/futils.js");
const fs = require('fs');
const client = new Discord.Client();
const got = require('got');
const snoowrap = require("snoowrap");
const r = new snoowrap({
  userAgent: process.env.USERAGENT,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRECT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});
const { pfx } = require("./config.json");

// command loader https://discordjs.guide/
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

var msgc = 0;
var delay = 3600000;

client.on('error', (e) => {
  console.log(e);
  console.error;
});

client.on("ready", function () {
  console.log(commandFiles);
  console.log(client.commands);
  console.log("\n\n");
  console.log(`Bot successfully started!\n[STATS] ${client.guilds.size} servers | ${client.channels.size} channels | ${client.users.size} users`);
  console.log("\n\n");

  client.user.setStatus("dnd");
  client.user.setActivity("Hentai", { type: "WATCHING" });
  var statusswitch = 0;
  setInterval(() => {
    if (statusswitch == 0) {
      client.user.setActivity(`${pfx}help`, { type: "STREAMING", url: "https://twitch.tv/suretic" });
      statusswitch++;
      console.log(`[BOT] status changed to "streaming"`);
    } else {
      if (statusswitch == 1) {
        client.user.setStatus("dnd");
        client.user.setActivity("Hentai", { type: "WATCHING" });
        statusswitch++;
        console.log(`[BOT] status changed to "watching"`);
      } else {
        client.user.setStatus("dnd");
        client.user.setActivity(`hentaisupplier.cf`, { type: "STREAMING", url: "https://twitch.tv/suretic" });
        statusswitch == 0;
        console.log(`[BOT] status changed to "watching"`);
      }
    }
  }, 450000);

  function getcl() {
    return new Promise((resolve) => {
      got("https://dl.dropboxusercontent.com/s/bukx8lcny98orma/guilds.json?dl=0", { json: true })
        .then(r => {
          var rp = r.body.cl;
          resolve(rp);
        })
        .catch(e => {
          console.error(e);
          var rp = [
            "couldn't find file",
            "check the provided url"
          ];
          resolve(rp);
        });
    });
  }

  //https://github.com/cawolfkreo/discord-reddit-bot
  async function postHentai() {
    function topP(subreddit) {
      const sub = r.getSubreddit(subreddit);
      return sub.getTop({ time: "day" });
    }
    async function chansend(posts) {
      if (posts.length > 0) {
        var cl = await getcl();
        for (i = 0; i < cl.length; i++) {
          var link = posts[0].permalink.split("/");
          const postemb = new Discord.RichEmbed()
            .setColor("0x" + futils.rhex())
            .setAuthor(`${posts[0].title}`, "https://styles.redditmedia.com/t5_2qj7g/styles/communityIcon_nsiiuaov6ni21.png")
            .setImage(`${posts[0].url}`)
            .setDescription(`https://redd.it/${link[4]}`)
            .setTimestamp()
          if (client.channels.find(c => c.id === cl[i])) {
            if (!client.channels.get(cl[i]).nsfw) {
              client.channels.get(cl[i]).send("This channel needs to be **NSFW** in order to be able to post for me. Contact **suretic#5364** if you want to change the channel or stop the bot.");
            } else {
              client.channels.get(cl[i]).send(postemb).catch(e => console.log(e));
            }
          } else {
            console.log(`Couldn't find channel ${cl[i]}`);
          };
        }
        console.log(`${futils.cdate(0)} New image → "${posts[0].title}" (https://redd.it/${link[4]})`);
        setTimeout(() => {
          const tail = posts.splice(1);
          chansend(tail);
        }, delay);
      }
    }
    topP("hentai")
      .then(res => chansend(res))
      .catch(e => console.error(e));
  }

  postHentai();

});

client.on("message", msg => {
  msgc++;
  if (msg.guild === null) {
    if (msg.author == client.user) return;
    if (!msg.content.startsWith(pfx)) {
      msg.channel.send(`Looking for commands?\nUse **${pfx}help** to get a list of all commands.`);
    }
  }

  if (msg.author == client.user) return;
  if (!msg.content.startsWith(pfx)) return;
  const args = msg.content.slice(pfx.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (!client.commands.has(cmd)) {
    msg.channel.send(`Unknown command! Use **${pfx}help** to get a list of all commands.`);
    return;
  }

  try {
    client.commands.get(cmd).execute(msg, args, client, msgc, cmd);
  } catch (error) {
    console.error(error);
    msg.reply(`Error! Couldn't execute your command. Try again later.`);
  }

});

client.login("ODEwNTAzMTY3OTg0MjcxMzgw.YCkl5Q.FH2lvRaJlyM5NuNmDP9_dPJpK50")
