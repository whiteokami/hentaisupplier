const fu = require("../modules/futils.js");
const Discord = require("discord.js");

module.exports = {
	name: 'help',
	description: 'shows all commands',
	execute(msg, args, client) {
    const e_h = client.emojis.get("526837150746935333");
    const e_e = client.emojis.get("526837150218715147");
    const e_n = client.emojis.get("526837149895622716");
    const e_t = client.emojis.get("526837148981264384");
    const e_a = client.emojis.get("526837143637721098");
    const e_i = client.emojis.get("526837149853810709");
    const emhelp = new Discord.RichEmbed()
    .setColor("0x"+fu.rhex())
    .setTitle("List of all commands")
    .addField("help", "shows this message")
    .addField("info", "shows information about this bot")
    .addField(`${e_h}${e_e}${e_n}${e_t}${e_a}${e_i}`, "This bot was made by suretic#5364 | You can contact me on Twitter @suretic")
		msg.channel.send(emhelp);
	},
};
