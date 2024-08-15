const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const database = require('../../modules/database.js');
const emojiids = require('../../modules/emojiids.js')

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('sendhoints')
		.setDescription('send someone some hoints!')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('username of the user you want to send hoints to!')
            .setRequired(true))
        .addIntegerOption(option =>
                option.setName('hoints')
                .setDescription('amount of hoints to send')
                .setRequired(true)
	        .setMinValue(1)
		.setMaxValue(1_000_000)),
	async execute(interaction) {
        const userId = interaction.user.id
        const userSend = interaction.options.getUser('user')
        const hointstosend = interaction.options.getInteger('hoints')
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userSend.id);
        if (user) {
            //console.log(`user ${userSend.username} already exists in the database! we can send h points to them!`)
            if (hointstosend < 0 || userSend.id == userId || database.prepare('SELECT hoints FROM users WHERE id = ?').get(userId).hoints < hointstosend) {
                void(0);
            } else {
                database.prepare('UPDATE users SET hoints = hoints - ? WHERE id = ?').run(hointstosend, userId);
                database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(hointstosend, userSend.id);
            }
        } else {
            //console.log(`user ${userSend.username} doesnt exist in the database! cant send h points to them!`)
        }
        
        const sentEmbed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`you have sent ${hointstosend} <:hoint:${emojiids["hoint"]}> hoints to user "${userSend.globalName}"!`)
        if (hointstosend < 0) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`you cant send negative hoints!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (userSend.id == userId) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`you cant send hoints to yourself!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (database.prepare('SELECT hoints FROM users WHERE id = ?').get(userId).hoints < hointstosend) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`you dont have that much hoints!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (!user) {
            const sentembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`that user doent have a hoint balance!`)
            return await interaction.reply({ embeds: [sentembed], ephemeral: true});
        }
        if (user || userSend.id != userId || hointstosend > 0) 
            {await interaction.reply({ embeds: [sentEmbed], ephemeral: true}); 
        }
	},
};
