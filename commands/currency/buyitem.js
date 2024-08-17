const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const items = require('../../modules/items.js')

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('buyitem')
		.setDescription('buy an item from the shop!')
        .addStringOption(option =>
            option.setName('item')
            .setDescription('the item you wanna buy!')
            .setRequired(true)),
	async execute(interaction) {
        const itemtobuy = interaction.options.getString('item')
        var itemfound = false
        items.forEach(row => {
            if (row.name == itemtobuy) {
                itemfound = true
                console.log("item in le table")
            }
        });
        if (!itemfound) {
            console.log("that item aint there wtf")
        }
	},
};
