const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const database = require('../../modules/database.js');
const emojiids = require("../../modules/emojiids.js")

module.exports = {
    cooldown: 60,
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointsgamble')
		.setDescription('get -25 to 50 hoints'),
	async execute(interaction) {
        const userId = interaction.user.id
        const username = interaction.user.tag
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const randomhoints = getRandomNumber(-25, 50)

        if (user) {
            //console.log(`user ${interaction.user.tag} already exists in the database!`)
        } else {
            //console.log(`user ${interaction.user.tag} doesnt exist in the database! creating database entry for user...`)
            database.prepare('INSERT INTO users (id, username, hoints) VALUES (?, ?, ?)').run(userId, username, 0);
        }
        if (database.prepare('SELECT hoints FROM users WHERE id = ?').get(userId) + randomhoints < 0) {
            database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(0, userId);
        } else {
            database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(randomhoints, userId);
        }
        const gamblemebed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> congrats`)
            //.setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
            //.setThumbnail('attachment://pfp.png')
            .addFields(
                { name: `you got ${randomhoints} hoints <:hoint:${emojiids["hoint"]}>!`, value: `your current amount of hoints: ${database.prepare("SELECT hoints FROM users WHERE id = ?").get(userId).hoints} <:hoint:${emojiids["hoint"]}>` },
            )
		await interaction.reply({ embeds: [gamblemebed], ephemeral: true});
	},
};
