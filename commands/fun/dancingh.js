const { SlashCommandBuilder } = require('discord.js');
const file = new AttachmentBuilder('../assets/discordjs.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dancingh')
		.setDescription('send a dancing h in chat'),
	async execute(interaction) {
		await interaction.reply();
	},
};
