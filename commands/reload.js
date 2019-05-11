const fs = require('fs');
const {pfx} = require("../config.json");
module.exports = {
  name: "reload",
  description: "reloads a command",
  execute(msg, args, client) {
    if(msg.author.id != "191093149345644544") return;
    if(!args.length) {
      return msg.channel.send("Provide a command to reload");
    } else
    if (!client.commands.has(args[0])) {
      return msg.channel.send(`Unknown command! Use **${pfx}help** to get a list of all commands.`);
    }
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    client.commands.delete(args[0]);
    const props = require(`./${args[0]}.js`);
    client.commands.set(`${args[0]}`, props);
    msg.reply(`The command **h!${args[0]}** has been reloaded`);
  },
};
