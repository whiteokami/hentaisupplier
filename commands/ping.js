module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {
		msg.channel.send(`Congratulations! You found a secret command!`);
	},
};
