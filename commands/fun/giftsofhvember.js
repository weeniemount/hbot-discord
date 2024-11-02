const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const emojiids = require('../../modules/emojiids.js');
const fs = require('fs'); // Assuming you have some files locally for attachment
const database = require('../../modules/database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giftsofhvember')
		.setDescription('time to get gifted in Hvember!'),
	async execute(interaction) {
		const randomNumber = Math.floor(Math.random() * 2) + 1

		if (randomNumber === 1) {
            const attachment = new AttachmentBuilder('hvember/The manual of H.pdf'); // Replace with your file path
            let embed = new EmbedBuilder()
                .setColor(0xfdd888)
                .setTitle("🎁")
                .setDescription("a manual for the true h'ers")

			await interaction.reply({ embeds: [embed], files: [attachment]})
        } else if (randomNumber === 2) {
            const userId = interaction.user.id
            const username = interaction.user.tag
            const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);

            if (user) {
                //console.log(`user ${interaction.user.tag} already exists in the database!`)
            } else {
                //console.log(`user ${interaction.user.tag} doesnt exist in the database! creating database entry for user...`)
                database.prepare('INSERT INTO users (id, username, hoints) VALUES (?, ?, ?)').run(userId, username, 0);
            }
            database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(10, userId);

            let embed = new EmbedBuilder()
                .setColor(0xfdd888)
                .setTitle("🎁")
                .setDescription(`you have been given 10 hoints <:hoint:${emojiids["hoint"]}>!`)
            
            await interaction.reply({ embeds: [embed]})
        }
	},
};
