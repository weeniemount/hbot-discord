const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('restartbot')
		.setDescription('restarts the bot (GUILD SPECIFIC, ONLY WORKS IF YOU STARTED THE BOT WITH PM2.'),
	async execute(interaction) {
		const restartembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle('restarting h bot...')
		await interaction.reply({embeds: [restartembed]})
		process.exit();
	},
};