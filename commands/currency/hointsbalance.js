const { SlashCommandBuilder, EmbedBuilder, embedLength } = require('discord.js');
const database = require('../../modules/database.js');
const emojiids = require('../../modules/emojiids.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointsbalance')
		.setDescription('hoints balance')
        .addUserOption(option =>
            option.setName('user')
            .setDescription("view someone else's balance!")
            .setRequired(false)),
	async execute(interaction) {
        const userId = interaction.user.id
        const username = interaction.user.tag
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        const otherUser = interaction.options.getUser('user')
        let otherUserBalance

        if (otherUser) {
            otherUserBalance = database.prepare('SELECT * FROM users WHERE id = ?').get(otherUser.id);
        }

        if (user) {
            // console.log(`user ${interaction.user.tag} already exists in the database!`)
        } else {
            // console.log(`user ${interaction.user.tag} doesnt exist in the database! creating database entry for user...`)
            if (!otherUser)
                database.prepare('INSERT INTO users (id, username, hoints) VALUES (?, ?, ?)').run(userId, username, 0);
        }
        if (otherUser) {
            if (otherUserBalance) {
                const hointsbalanceotheruser = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`${otherUser.username}'s hoints balance`)
                    .setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
                    .setThumbnail('attachment://pfp.png')
                    .addFields(
                            { name: 'hoints:', value: `${otherUserBalance.hoints} <:hoint:${emojiids["hoint"]}>` },
                    )
                await interaction.reply({ embeds: [hointsbalanceotheruser]});
            } else {
                const errorembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:error:${emojiids["error"]}> that user doesnt have a hoints balance!`)
                await interaction.reply({ embeds: [errorembed], ephemeral: true});
            }
        } else {
            const hointsbalance = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:info:${emojiids["info"]}> ${interaction.user.tag}'s hoints balance`)
                .setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
                .setThumbnail('attachment://pfp.png')
                .addFields(
                    { name: 'hoints:', value: `${database.prepare("SELECT hoints FROM users WHERE id = ?").get(userId).hoints} <:hoint:${emojiids["hoint"]}>` },
                )
            await interaction.reply({ embeds: [hointsbalance]});
        }
	},
};
