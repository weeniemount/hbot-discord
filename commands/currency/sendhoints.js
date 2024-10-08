const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
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

        if (hointstosend < 0) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:error:${emojiids["error"]}> you cant send negative hoints!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (userSend.id == userId) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:error:${emojiids["error"]}> you cant send hoints to yourself!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (database.prepare('SELECT hoints FROM users WHERE id = ?').get(userId).hoints < hointstosend) {
            const errorembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:error:${emojiids["error"]}> you dont have that much hoints!`)
            return await interaction.reply({ embeds: [errorembed], ephemeral: true});
        }
        if (!user) {
            const sentembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`<:error:${emojiids["error"]}> that user doesnt have a hoint balance!`)
            return await interaction.reply({ embeds: [sentembed], ephemeral: true});
        }

        const yes = new ButtonBuilder()
			.setCustomId('yes')
			.setLabel('yes')
			.setStyle(ButtonStyle.Success);
        const no = new ButtonBuilder()
			.setCustomId('no')
			.setLabel('no')
			.setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
			.addComponents(yes, no);
        
        const confirmembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> are you sure you want to send ${hointstosend} hoints <:hoint:${emojiids["hoint"]}> to ${userSend.globalName}?`)

        const response = await interaction.reply({ embeds: [confirmembed], components: [row], ephemeral: true });
        const confirmation = await response.awaitMessageComponent({ time: 60000 });

        try {
            if (confirmation.customId === 'yes') {
                if (user) {
                    //console.log(`user ${userSend.username} already exists in the database! we can send h points to them!`)
                    if (hointstosend < 0 || userSend.id == userId || database.prepare('SELECT hoints FROM users WHERE id = ?').get(userId).hoints < hointstosend) {
                        void(0);
                    } else {
                        database.prepare('UPDATE users SET hoints = hoints - ? WHERE id = ?').run(hointstosend, userId);
                        database.prepare('UPDATE users SET hoints = hoints + ? WHERE id = ?').run(hointstosend, userSend.id);
                    }
                }// else {
                    //console.log(`user ${userSend.username} doesnt exist in the database! cant send h points to them!`)
                //}
                
                const sentEmbed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:info:${emojiids["info"]}> you have sent ${hointstosend} hoints <:hoint:${emojiids["hoint"]}> to user ${userSend.globalName}!`)
                if (user || userSend.id != userId || hointstosend > 0) {
                    await confirmation.update({ embeds: [sentEmbed], components: [], ephemeral: true});
                }
            } else if (confirmation.customId === 'no') {
                const cancelembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:info:${emojiids["info"]}> transaction of ${hointstosend} hoints <:hoint:${emojiids["hoint"]}> to ${userSend.globalName} cancelled.`)
                await confirmation.update({ embeds: [cancelembed], components: [], ephemeral: true}); 
            }
        } catch(e) {
            // h
        }
	},
};
