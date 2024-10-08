const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const items = require('../../modules/items.js')
const { guildId } = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('itemshop')
		.setDescription('whats in the shop?'),
	async execute(interaction) {
        const currentserverid = interaction.guild.id

        const nextpage = new ButtonBuilder()
            .setCustomId(`nextpage`)
            .setLabel(`>`)
            .setStyle(ButtonStyle.Primary);
        const lastpage = new ButtonBuilder()
            .setCustomId(`lastpage`)
            .setLabel(`<`)
            .setStyle(ButtonStyle.Primary);
        
        
        const row = new ActionRowBuilder()
            .addComponents(lastpage, nextpage);
        const page1items = items.slice(0,5)
        const page1 = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> hoint shop - page 1`)
            .setThumbnail('attachment://pfp.png')
        page1items.forEach(item => {
            if (!item.isanimated) {
                page1.addFields({
                    name: `<:${item.itemid}:${item.emoji}> ${item.name} : ${item.price} <:hoint:${emojiids["hoint"]}>`, value: item.description
                });
            } else {
                page1.addFields({
                    name: `<a:${item.itemid}:${item.emoji}> ${item.name} : ${item.price} <:hoint:${emojiids["hoint"]}>`, value: item.description
                });
            }
        });
        const page2items = items.slice(5,10)
        const page2 = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> hoint shop - page 2`)
            .setThumbnail('attachment://pfp.png')
        page2items.forEach(item => {
            if (!item.isanimated) {
                page2.addFields({
                    name: `<:${item.itemid}:${item.emoji}> ${item.name} : ${item.price} <:hoint:${emojiids["hoint"]}>`, value: item.description
                });
            } else {
                page2.addFields({
                    name: `<a:${item.itemid}:${item.emoji}> ${item.name} : ${item.price} <:hoint:${emojiids["hoint"]}>`, value: item.description
                });
            }
        });

        const updateInteraction = async (interaction) => {
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1200000 });

            collector.on('collect', async confirmation => {
                if (confirmation.customId === 'lastpage') {
                    await confirmation.update({ embeds: [page1], components: [row] });
                } else if (confirmation.customId === 'nextpage') {
                    await confirmation.update({ embeds: [page2], components: [row] });
                }
            });
            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({ content: 'you didnt choose a category in 1 minute...', components: [], ephemeral: true });
                }
            });
        }
        await interaction.reply({ embeds: [page1], components: [row] });
        updateInteraction(interaction);
	},
};
