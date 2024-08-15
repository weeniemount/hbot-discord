const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('ping')
		.setDescription('replies with Pong!'),
	async execute(interaction) {
		const startTime = Date.now();
		
		const pingembed = new EmbedBuilder()
			.setColor(0xef2213)
			.setTitle(`Pong! ${interaction.client.ws.ping}ms. `)

		/*const endTime = Date.now();
		const duration = endTime - startTime;
		pingembed.addFields({ name: `time it took to respond: ${duration}ms!`, value:'   ' },)*/
		await interaction.reply({embeds: [pingembed]});
	},
};
