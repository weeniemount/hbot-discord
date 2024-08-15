const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('ping')
		.setDescription('replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
