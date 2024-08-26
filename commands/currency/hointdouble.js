const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const database = require('../../modules/database.js');
const emojiids = require('../../modules/emojiids.js')

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder({ integration_types: [0,1] })
        .setName('hointdouble')
        .setDescription('double your hoints or lose them all')
        .addIntegerOption(option =>
            option.setName('hoints')
            .setDescription('amount of hoints to use for double or nothing')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(1_000_000)),
    async execute(interaction) {
        const userId = interaction.user.id;
        const hointstouse = interaction.options.getInteger('hoints');
        const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        let randomResult = Math.floor(Math.random() * 2);
        
        if (user) {
            //console.log(`user ${interaction.user.tag} already exists in the database!`);
        } else {
            //console.log(`user ${interaction.user.tag} doesnt exist in the database! creating database entry for user...`);
            database.prepare('INSERT INTO users (id, username, hoints) VALUES (?, ?, ?)').run(userId, interaction.user.tag, 0);
        }

        if (user.hoints < hointstouse) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:error:${emojiids["error"]}> you dont have that much hoints!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true });
        }

        database.prepare('UPDATE users SET hoints = hoints - ? WHERE id =?').run(hointstouse, userId);
        if (randomResult === 1) {
            database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(hointstouse * 2, userId);
        } else {
            void(0);
        }

        const hointembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> result`)
            .addFields(
                { name: `you ${randomResult === 1 ? 'doubled' : 'lost'} your hoints`, value: `your current amount of hoints: ${database.prepare("SELECT hoints FROM users WHERE id = ?").get(userId).hoints} <:hoint:${emojiids["hoint"]}>` }
            )
        await interaction.reply({ embeds: [hointembed], ephemeral: true });
    },
};
