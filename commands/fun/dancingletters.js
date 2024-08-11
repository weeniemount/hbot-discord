const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('dancingletters')
	.setDescription('send a dancing letter of your choice in chat')
	.addStringOption(option =>
		option.setName('letter')
		.setDescription('the letter you want')
		.setRequired(true)),
		async execute(interaction) {
			const file = new AttachmentBuilder(`images/dancingletters/${interaction.options.getString('letter')}.gif`);
			await interaction.reply({ files: [file] });
	},
};
