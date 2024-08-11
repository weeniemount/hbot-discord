const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const file = new AttachmentBuilder('images/dancingh.gif');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dancingh')
		.setDescription('send a dancing h in chat'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setImage('attachment://dancingh.gif');
		await interaction.reply({ embeds: [exampleEmbed], files: [file] });
	},
};
