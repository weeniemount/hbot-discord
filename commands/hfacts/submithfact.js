const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client, GatewayIntentBits } = require('discord.js');
const hfactstable = require('../../modules/hfactstable.js')
const { token } = require('../../config.json');
const client = require('../../modules/client.js')


module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('submithfact')
		.setDescription('submit an h fact for review!')
        .addStringOption(option =>
            option.setName('fact')
            .setDescription('your h fact!')
            .setRequired(true)),
	async execute(interaction) {
        const randomFact = Math.floor(Math.random() * hfactstable.length);
        const fact = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle("your h fact has been submitted")
		await interaction.reply({embeds: [fact], ephemeral: true});

        // submmiting

        const accept = new ButtonBuilder()
			.setCustomId('accept')
			.setLabel('accept')
			.setStyle(ButtonStyle.Success);
        const decline = new ButtonBuilder()
			.setCustomId('decline')
			.setLabel('decline')
			.setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
			.addComponents(accept, decline);

        var channel = await client.channels.fetch("1272883149944389672")
        if (channel && channel.isTextBased()) {    
            const embed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle('h fact submission')
                .addFields(
                    { name: 'h fact:', value: interaction.options.getString('fact') },
                )
            await channel.send({ embeds: [embed], components: [row], });
        } else {
            console.error("Channel not found or is not a text-based channel.");
        }
	},
};
