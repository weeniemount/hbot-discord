const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const file = new AttachmentBuilder('images/pfp.png');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dancingwords')
		.setDescription('make your words out of dancing letters!!'),
	async execute(interaction) {
		await interaction.reply("im fucking shitting myself bitches");
	},
};
