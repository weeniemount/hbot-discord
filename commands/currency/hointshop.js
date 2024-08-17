const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const items = require('../../modules/items.js')
const { guildId } = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointshop')
		.setDescription('whats in the shop?'),
	async execute(interaction) {
        const currentserverid = interaction.guild.id

        const page1button = new ButtonBuilder()
            .setCustomId(`page1button`)
            .setLabel(`page 1`)
            //.setEmoji(emojiids["steamhappy"])
            .setStyle(ButtonStyle.Primary);
        
        
        const row = new ActionRowBuilder()
            .addComponents(page1button);
        const page1items = items.slice(0,5)
        const page1 = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> hoint shop - page 1`)
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: `<:${page1items[0].itemid}:${page1items[0].emoji}> ${page1items[0].name} : ${page1items[0].price} <:hoint:${emojiids["hoint"]}>`, value: `${page1items[0].description}` },
            )
        const updateInteraction = async (interaction) => {
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1200000 });

            collector.on('collect', async confirmation => {
                if (confirmation.customId === 'page1button') {
                    await confirmation.update({ embeds: [page1], components: [row] });
                }
            });
            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({ content: 'you didnt choose a category in 1 minute...', components: [], ephemeral: true });
                }
            });
        }
        await interaction.reply({ embeds: [page1], components: [row], ephemeral: true });
        updateInteraction(interaction);
	},
};
