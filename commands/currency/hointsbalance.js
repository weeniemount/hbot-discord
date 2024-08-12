const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const database = require('../../modules/database.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointsbalance')
		.setDescription('hoints balance'),
	async execute(interaction) {
        const userId = interaction.user.id
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        if (user) {
            // Update existing user points
            database.prepare('UPDATE users SET points = points + ? WHERE id = ?').run(pointsToAdd, userId);
        } else {
            // Insert new user with points
            database.prepare('INSERT INTO users (id, points) VALUES (?, ?)').run(userId, 0);
        }
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`${interaction.user.tag}'s hoints balance`)
            .setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'hoints:', value: 'idk???? why are you asking me' },
            )
		await interaction.reply({ embeds: [exampleEmbed]});
	},
};
