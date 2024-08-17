const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const database = require('../../modules/database.js')
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
        const userid = interaction.user.id
        const username = interaction.user.tag
        const userhoints = database.prepare('SELECT * FROM users WHERE id = ?').get(userid);
        const userinventory = database.prepare('SELECT * FROM inventory WHERE userid = ?').get(userid);

        var inventorydata = []
        if (userhoints) {
            //console.log(`user ${interaction.user.tag} already exists in the database!`)
        } else {
            database.prepare('INSERT INTO users (id, username, hoints) VALUES (?, ?, ?)').run(userid, username, 0);
        }

        if (userinventory) {
            inventorydata = JSON.parse(userinventory.inventorydata)
        } else {
            database.prepare('INSERT INTO inventory (userid, username, inventorydata) VALUES (?, ?, ?)').run(userid, username, JSON.stringify(inventorydata));
        }

        var itemfound = false
        items.forEach(row => {
            if (row.name == itemtobuy) {
                itemfound = true
                await interaction.reply("i think i added an item to your inventory? im not sure check the db file lmfao")
            }
        });
        if (!itemfound) {
            //console.log("that item aint there wtf")
        }
	},
};
