const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ownerUserID } = require("../../config.json")

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('restartbot')
		.setDescription('restarts the bot (GUILD SPECIFIC, ONLY WORKS IF YOU STARTED THE BOT WITH PM2.'),
	async execute(interaction) {
		if (interaction.user.id == ownerUserID) {
			const restartembed = new EmbedBuilder()
				.setColor(0xef2213)
				.setTitle(`<:management:${emojiids["management"]}> restarting h bot...`)
			await interaction.reply({embeds: [restartembed]})
			process.exit();
		} else {
			const sentembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:management:${emojiids["management"]}> you dont have permission to execute this command!`)
            return await interaction.reply({ embeds: [sentembed], ephemeral: true});
		}
	},
};