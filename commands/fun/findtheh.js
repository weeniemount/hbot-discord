const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const emojiids = require('../../modules/emojiids.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findtheg')
        .setDescription('makes a board of random letters, find the g!'),
    async execute(interaction) {
        const buttons = [];
        const letters = "abcdefghijklmnopqrstuvwxyz".replace("g", "");
        const hButtonIndex = Math.floor(Math.random() * 25);

        for (let i = 0; i < 25; i++) {
            const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
            const emojiId = i === hButtonIndex ? emojiids["g"] : emojiids[randomLetter];

            buttons.push(
                new ButtonBuilder()
                    .setCustomId(i === hButtonIndex ? `theg_${i}` : `everythingelse_${i}`)
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

            if (confirmation.customId.startsWith('theg')) {
                const congratembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:checkmark:${emojiids["checkmark"]}> you found the g! congrats!`);
                await confirmation.update({ embeds: [congratembed], components: [] });
            } else {
                const errorembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle(`<:error:${emojiids["error"]}> oh no! that wasnt the g!`);
                await confirmation.update({ embeds: [errorembed], components: [] });
            }
        } catch (e) {
            console.log(`No interaction was received. Error: ${e.message}`);
            await interaction.editReply({ content: 'No one found the G in time! Try again later.', components: [] });
        }
    }
}
