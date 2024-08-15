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
                .setRequired(true)),
	async execute(interaction) {
        const userId = interaction.user.id
        const userSend = interaction.options.getUser('user')
        const hointstosend = interaction.options.getInteger('hoints')
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userSend.id);

        if (user) {
            console.log(`user ${userSend.username} already exists in the database! we can send h points to them!`)
            if (hointstosend < 0 || userSend.id == userId) {
                void(0);
            } else {
                database.prepare('UPDATE users SET hoints = hoints - ? WHERE id = ?').run(hointstosend, userId);
                database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(hointstosend, userSend.id);
            }
        } else {
            console.log(`user ${userSend.username} doesnt exist in the database! cant send h points to them!`)
        }
        
        const sentEmbed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`you have sent ${hointstosend} <:hoint:${emojiids["hoint"]}> hoints to user "${userSend.globalName}"!`)
        if (hointstosend < 0) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`you cant send negative hoints!`)
            await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (userSend.id == userId) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`you cant send hoints to yourself!`)
            await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (user) {await interaction.reply({ embeds: [sentEmbed], ephemeral: true});
        } else {
            const sentembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`that user doent have a hoint balance!`)
            await interaction.reply({ embeds: [sentembed], ephemeral: true});
        }
	},
};
