const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const database = require('../../modules/database.js')
const items = require('../../modules/items.js')

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('sellitem')
		.setDescription('sell an item from the shop!')
        .addStringOption(option =>
            option.setName('item')
            .setDescription('the item you wanna sell!')
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
                    if (inventorydata[i].quantity > 1) {
                        inventorydata[i].quantity -= 1;
                        itemExistsInInventory = true;
                        break;
                    } else if (inventorydata[i].quantity == 1) {
                        inventorydata.splice(i, 1);
                        itemExistsInInventory = true;
                        break;
                    }
                }
            }
            if (!itemExistsInInventory) {
                const errorembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:error:${emojiids["error"]}> that item isnt in your inventory!`)
                    .setThumbnail('attachment://pfp.png')
                return interaction.reply({embeds: [errorembed]})
            }

            database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(item.price, userid);
            database.prepare('UPDATE inventory SET inventorydata = ? WHERE userid = ?').run(JSON.stringify(inventorydata), userid);
            const solditemembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:checkmark:${emojiids["checkmark"]}> you have sold "${itemtobuy}" for ${item.price} <:hoint:${emojiids["hoint"]}>!\n your hoints balance: ${database.prepare("SELECT hoints FROM users WHERE id = ?").get(userid).hoints} <:hoint:${emojiids["hoint"]}>`)
                .setThumbnail('attachment://pfp.png')
            interaction.reply({embeds: [solditemembed]})
        } else {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:error:${emojiids["error"]}> that item doesnt exist!`)
                .setThumbnail('attachment://pfp.png')
            interaction.reply({embeds: [errorembed]})
        }
	},
};
