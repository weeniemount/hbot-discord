const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const emojiids = require('../../modules/emojiids.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder({ integration_types: [0,1] })
	.setName('dancing')
	.setDescription('send a dancing letter, number or symbol of your choice in chat')
	.addStringOption(option =>
		option.setName('input')
		.setDescription('the letter, number or symbol you want')
		.setRequired(true).setMaxLength(2)),
		async execute(interaction) {
			const letterRegex = /^[a-zA-Z]+$/;
  			const numberRegex = /^[0-9]+$/;
			var inputted = interaction.options.getString('input')
			var symbolfilename = {
				"&": "ampersand",
				"@": "at",
				"$": "dollarsign",
				"!": "exclamationpoint",
				"?": "questionmark"
			}
			if (inputted.length < 2) {
				if (["&","@","$","!","?"].includes(inputted)) {
					const file = new AttachmentBuilder(`images/dancingletters/${symbolfilename[inputted]}.gif`);
					await interaction.reply({ files: [file] });
				} else {
					if (letterRegex.test(inputted) || numberRegex.test(inputted)) {
						const file = new AttachmentBuilder(`images/dancingletters/${inputted}.gif`);
						await interaction.reply({ files: [file] });
					} else {
						const errorembed = new EmbedBuilder()
							.setColor(0xef2213)
							.setTitle(`<:error:${emojiids["error"]}> that symbol isnt allowed!`)
						await interaction.reply({ embeds: [errorembed], ephemeral: true });
					}
				}
			} else if (inputted.length >= 2) {
				const errorembed = new EmbedBuilder()
					.setColor(0xef2213)
					.setTitle(`<:error:${emojiids["error"]}> you cant put something longer then 1 character!`)
				await interaction.reply({ embeds: [errorembed], ephemeral: true });
			}
	},
};
