const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('dancing')
	.setDescription('send a dancing letter, number or symbol of your choice in chat')
	.addStringOption(option =>
		option.setName('letter')
		.setDescription('the letter you want')
		.setRequired(true)),
		async execute(interaction) {
			if (interaction.options.getString('letter').length < 2) {
				const file = new AttachmentBuilder(`images/dancingletters/${interaction.options.getString('letter')}.gif`);
				await interaction.reply({ files: [file] });
			} else if (interaction.options.getString('letter').length >= 2) {
				const errorembed = new EmbedBuilder()
					.setColor(0xef2213)
					.setTitle('you cant put something longer then 1 character!')
				await interaction.reply({ embeds: [errorembed], ephemeral: true });
			}
	},
};
