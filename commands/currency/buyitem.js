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
        items.forEach(row => {
            if (row.name == itemtobuy) {
                console.log("item in le table")
                return
            }
        });
        console.log("that item anint there wtf")
	},
};
