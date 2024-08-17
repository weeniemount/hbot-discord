const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const items = require('../../modules/items.js')
const database = require('../../modules/database.js')

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('inventory')
		.setDescription('view your inventory!'),
	async execute(interaction) {
        const userid = interaction.user.id
        const inventoryembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> ${interaction.user.tag}'s inventory`)
            .setThumbnail('attachment://pfp.png')
        var inventorydata = JSON.parse(database.prepare('SELECT * FROM inventory WHERE userid = ?').get(userid).inventorydata)
        inventorydata.forEach(({ itemid, quantity }) => {
            const itemdetails = items.find(item => item.itemid === itemid);
            if (itemdetails) {
                const itemEmoji = itemdetails.isanimated ? `<a:${itemdetails.itemid}:${itemdetails.emoji}>` : `<:${itemdetails.itemid}:${itemdetails.emoji}>`;
                inventoryembed.addFields({
                    name: `${itemEmoji} ${itemdetails.name}`, value: `${itemdetails.description}\nquantity: ${quantity}`,
                });
            }
        });
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
        await interaction.reply({ embeds: [inventoryembed] });
        updateInteraction(interaction);
	},
};
