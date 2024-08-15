const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('ping')
		.setDescription('replies with Pong!'),
	async execute(interaction) {
		const startTime = Date.now();
		
		const pingembed = new EmbedBuilder()
			.setColor(0xef2213)
			.setTitle(`Pong!`)
			.addFields(
				{name: `${interaction.client.ws.ping} ms`, value: "     "}
			)
		const pingembedsecret = new EmbedBuilder()
			.setColor(0xef2213)
			.setTitle(`Pong!`)
			.addFields(
				{name: "${interaction.client.ws.ping} (you got an easter egg! i love interaction.client.ws.ping ms) ms", value: "     "}
			)
		const randomNumber = Math.floor(Math.random() * 1000) + 1;
		if (randomNumber == 1) {
			await interaction.reply({embeds: [pingembedsecret]});
		} else {
			await interaction.reply({embeds: [pingembed]});
		}
	},
};
