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
        const item = items.find(item => item.name === itemtobuy);

        if (item) {
            let itemExistsInInventory = false;
            for (let i = 0; i < inventorydata.length; i++) {
                if (inventorydata[i].itemid === item.itemid) {
                    inventorydata[i].quantity += 1;
                    itemExistsInInventory = true;
                    break;
                }
            }
            if (!itemExistsInInventory) {
                inventorydata.push({ itemid: item.itemid, quantity: 1 });
            }
            
            database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(1, userId);
            database.prepare('UPDATE inventory SET inventorydata = ? WHERE userid = ?').run(JSON.stringify(inventorydata), userid);
            const boughtitemembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:checkmark:${emojiids["checkmark"]}> you have bought "${itemtobuy}" for ${item.price} <:hoint:${emojiids["hoint"]}>!\n your hoints balance: `)
                .setThumbnail('attachment://pfp.png')
            interaction.reply({embeds: [boughtitemembed]})
        }
        if (!itemfound) {
            //console.log("that item aint there wtf")
        }
	},
};