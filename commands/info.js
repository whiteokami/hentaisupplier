const fu = require("../modules/futils.js");
const Discord = require("discord.js");
module.exports = {
  name: "info",
  description: "shows info about the bot",
  execute(msg,args,client,msgc) {
    var d = client.user.createdAt.toString().split(" ");
    const eminfo = new Discord.RichEmbed()
    .setColor("0x"+fu.rhex())
    .setTitle("information about the bot")
    .addField("source", "https://github.com/suretic/hentaisupplier")
    .addField("creation date", `${d[1]} ${d[2]} ${d[3]}`)
    .addField("servers", `${client.guilds.size}`)
    .addField("received messages since last restart", msgc)
    .addBlankField()
    msg.channel.send(eminfo);
  },
};
