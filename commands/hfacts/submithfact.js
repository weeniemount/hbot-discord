const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client, GatewayIntentBits } = require('discord.js');
const hfactstable = require('../../modules/hfactstable.js')
const { token } = require('../../config.json');
const client = require('../../modules/client.js')
const database = require('../../modules/database.js')
const { hfactsChannelID } = require('../../config.json');

var userid
var username
var hfact
var userpfp

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
        userid = interaction.user.id
        username = interaction.user.tag
        hfact = interaction.options.getString('fact')
        userpfp = interaction.user.avatarURL()
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

        var channel = await client.channels.fetch(hfactsChannelID)
        if (channel && channel.isTextBased()) {    
            const embed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle('h fact submission')
                .addFields(
                    { name: 'h fact:', value: hfact },
                )
                .setFooter({text: `h fact submmited by @${username}`, iconURL: userpfp})
            const response = await channel.send({ embeds: [embed], components: [row], });
            //const collectorFilter = 635875339804868638;
            const confirmation = await response.awaitMessageComponent({ time: 86400000 });

            try {
                if (confirmation.customId === 'accept') {
                    const embedaccept = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle('h fact submission')
                        .addFields(
                            { name: `h fact "${hfact}" has been accepted`, value: 'yey!' },
                        )
                        .setFooter({text: `h fact submmited by @${username}`, iconURL: userpfp})
                    await confirmation.update({ embeds: [embedaccept], components: [] });
                    database.prepare('INSERT INTO submittedhfacts (hfact, userid, username) VALUES (?, ?, ?)').run(hfact, userid, username);
                } else if (confirmation.customId === 'decline') {
                    const embeddecline = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle('h fact submission')
                        .addFields(
                            { name: `h fact "${hfact}" has been declined`, value: 'aww...' },
                        )
                        .setFooter({text: `h fact submmited by @${username}`, iconURL: userpfp})
                    await confirmation.update({ embeds: [embeddecline], components: [] });
                }
            } catch (e) {
                console.log(`h fact '${hfact}' has been declined because no one accepted/declined it. sad....`)
                await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
            }
        } else {
            console.error("Channel not found or is not a text-based channel.");
        }
	},
};
