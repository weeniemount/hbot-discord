const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const database = require('../../modules/database.js');
const emojiids = require('../../modules/emojiids.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointsbalance')
		.setDescription('hoints balance'),
	async execute(interaction) {
        const userId = interaction.user.id
        const username = interaction.user.tag
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        if (user) {
            // console.log(`user ${interaction.user.tag} already exists in the database!`)
        } else {
            // console.log(`user ${interaction.user.tag} doesnt exist in the database! creating database entry for user...`)
            database.prepare('INSERT INTO users (id, username, hoints) VALUES (?, ?, ?)').run(userId, username, 0);
        }
        const hointsbalance = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`${interaction.user.tag}'s hoints balance`)
            .setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'hoints:', value: `${database.prepare("SELECT hoints FROM users WHERE id = ?").get(userId).hoints} <:hoint:${emojiids["hoint"]}>` },
            )
		await interaction.reply({ embeds: [hointsbalance]});
	},
};
