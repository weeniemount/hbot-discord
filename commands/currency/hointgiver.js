const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const database = require('../../modules/database.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hointgiver')
		.setDescription('get 1 single hoint'),
	async execute(interaction) {
        const userId = interaction.user.id
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        if (user) {
            console.log(`user ${interaction.user.tag} already exists in the database!`)
        } else {
            console.log(`user ${interaction.user.tag} doesnt exist in the database! creating database entry for user...`)
            database.prepare('INSERT INTO users (id, hoints) VALUES (?, ?)').run(userId, 0);
        }
        database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(1, userId);
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`congrats`)
            //.setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
            //.setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'you got a hoint!', value: `your current amount of hoints: ${database.prepare("SELECT hoints FROM users WHERE id = ?").get(userId).hoints}` },
            )
		await interaction.reply({ embeds: [exampleEmbed]});
	},
};
