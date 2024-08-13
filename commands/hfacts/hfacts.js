const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const hfactstable = require('../../modules/hfactstable.js')

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hfacts')
		.setDescription('gives you a random h fact!'),
	async execute(interaction) {
        const randomFact = Math.floor(Math.random() * hfactstable.length);
        const fact = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(hfactstable[randomFact])
		await interaction.reply({embeds: [fact]});
	},
};
