const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const database = require('../../modules/database.js');
const emojiids = require('../../modules/emojiids.js');

module.exports = {
    cooldown: 30,
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointleaderboard')
		.setDescription('top 10 people with the most hoints'),
	async execute(interaction) {
        const topUsers = database.prepare("SELECT id, username, hoints FROM users ORDER BY hoints DESC LIMIT ?").all(10);

        var leaderboardata = ""

        if (topUsers.length > 0) {    
            topUsers.forEach((user, index) => {
                leaderboardata += `${index + 1}. ${user.username}: ${user.hoints} hoints <:hoint:${emojiids["hoint"]}>\n`;
            });
        }
        const hointleaderboard = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`hoint leaderboard`)
            .setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: `leaderboard`, value: leaderboardata },
            )
		await interaction.reply({ embeds: [hointleaderboard]});
	},
};
