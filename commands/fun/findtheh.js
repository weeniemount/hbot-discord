const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const emojiids = require('../../modules/emojiids.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findtheh')
        .setDescription('makes a board of random letters, find the h!'),
    async execute(interaction) {
        const buttons = [];
        const letters = "abcdefghijklmnopqrstuvwxyz".replace("h", "");
        const hButtonIndex = Math.floor(Math.random() * 25);

        for (let i = 0; i < 25; i++) {
            const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
            const emojiId = i === hButtonIndex ? emojiids["h"] : emojiids[randomLetter];

            buttons.push(
                new ButtonBuilder()
                    .setCustomId(i === hButtonIndex ? `theh_${i}` : `everythingelse_${i}`)
                    .setEmoji(emojiId)
                    .setStyle(ButtonStyle.Primary)
            );
        }

        const rows = [];
        for (let i = 0; i < buttons.length; i += 5) {
            rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
        }

        const response = await interaction.reply({ components: rows, fetchReply: true });

        try {
            const confirmation = await response.awaitMessageComponent({
                filter: i => i.user.id === interaction.user.id,
                time: 60000,
            });

            if (confirmation.customId.startsWith('theh')) {
                const congratembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:checkmark:${emojiids["checkmark"]}> you found the h! congrats!`);
                await confirmation.update({ embeds: [congratembed], components: [] });
            } else {
                const errorembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:error:${emojiids["error"]}> oh no! that wasnt the h!`);
                await confirmation.update({ embeds: [errorembed], components: [] });
            }
        } catch (e) {
            console.log(`No interaction was received. Error: ${e.message}`);
            await interaction.editReply({ content: 'No one found the H in time! Try again later.', components: [] });
        }
    }
}
