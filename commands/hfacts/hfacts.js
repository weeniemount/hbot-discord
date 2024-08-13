const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const hfactstable = require('../../modules/hfactstable.js')
const database = require("../../modules/database.js")

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hfacts')
		.setDescription('gives you a random h fact!')
		.addBooleanOption(option =>
            option.setName('userfacts')
            .setDescription('gives you a random user submitted h fact instead')
            .setRequired(false)),
	async execute(interaction) {
		if (interaction.options.getBoolean('userfacts')) {
			const randomFact = database.prepare('SELECT hfact, username FROM submittedhfacts ORDER BY RANDOM() LIMIT 1').get();
			const fact = new EmbedBuilder()
				.setColor(0xef2213)
				.setTitle(randomFact.hfact)
				.setFooter({text: `h fact submitted by @${randomFact.username}`})
			await interaction.reply({embeds: [fact]});
		} else {
			const randomFact = Math.floor(Math.random() * hfactstable.length);
			const fact = new EmbedBuilder()
				.setColor(0xef2213)
				.setTitle(hfactstable[randomFact])
			await interaction.reply({embeds: [fact]});
		}
	},
};
