const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const file = new AttachmentBuilder('images/pfp.png');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('help')
		.setDescription('h bot commands!'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle('h bot help')
            .setAuthor({ name: 'h bot', iconURL: 'attachment://pfp.png'})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'funnys', value: '/dancingh - shows you a dancing h gif\n/dancing <letter/number/symbol> - show a dancing letter, number or smybol of your choice\n/dancingwords <words> - make your words out of dancing letters!\n/ping - pong!' },
                { name: 'useful', value: '/help - shows you this help page' },
                { name: 'currency', value: '/hointsbalance - shows you your hoints balance\n/hointgiver - gives you one single hoint' },
            )
		await interaction.reply({ embeds: [exampleEmbed], files: [file], ephemeral: true });
	},
};
