const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const file = new AttachmentBuilder('images/dancingletters/h.gif');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('dancingh')
		.setDescription('send a dancing h in chat'),
	async execute(interaction) {
		await interaction.reply({ files: [file] });
	},
};
