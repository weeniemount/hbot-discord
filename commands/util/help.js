const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const emojiids = require('../../modules/emojiids.js')
const { guildId } = require('../../config.json')

const file = new AttachmentBuilder('images/pfp.png');
const weeniemount = new AttachmentBuilder(`images/weeniemount.png`);

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('help')
		.setDescription('h bot commands!'),
	async execute(interaction) {
        const currentserverid = interaction.guild.id

        const funnys = new ButtonBuilder()
            .setCustomId(`funnys`)
            .setLabel(`funnys`)
            .setEmoji(emojiids["steamhappy"])
            .setStyle(ButtonStyle.Primary);
        const useful = new ButtonBuilder()
            .setCustomId(`useful`)
            .setLabel(`useful`)
            .setEmoji(emojiids["helpful"])
            .setStyle(ButtonStyle.Primary);
        const currency = new ButtonBuilder()
            .setCustomId(`currency`)
            .setLabel(`currency`)
            .setEmoji(emojiids["hoint"])
            .setStyle(ButtonStyle.Primary);
        const hfacts = new ButtonBuilder()
            .setCustomId(`hfacts`)
            .setLabel(`h facts`)
            .setEmoji(emojiids["nerd"])
            .setStyle(ButtonStyle.Primary);

        const devcommands = new ButtonBuilder()
            .setCustomId(`devcommands`)
            .setLabel(`dev commands`)
            .setEmoji(emojiids["devicon"])
            .setStyle(ButtonStyle.Primary);
        
        const devrow = new ActionRowBuilder()
            .addComponents(funnys, useful, currency, hfacts, devcommands);
        const row = new ActionRowBuilder()
            .addComponents(funnys, useful, currency, hfacts);
        
        const helpembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle('h bot help')
            .setAuthor({ name: 'h bot', iconURL: 'attachment://pfp.png'})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'choose a category!', value: 'press a button to display that category!' },
            )
            .setFooter({ text: `made with love and h by @weeniemount`, iconURL: 'attachment://weeniemount.png' });
        const collectorFilter = i => i.user.id === interaction.user.id;
        var repsonse
        if (currentserverid == guildId) {
            response = await interaction.reply({ embeds: [helpembed], components: [devrow], ephemeral: true });
        } else {
            response = await interaction.reply({ embeds: [helpembed], components: [row], ephemeral: true });
        }
        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

        try {
            if (confirmation.customId === 'funnys') {
                const helpinfoembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle('funnys category')
                    .setThumbnail('attachment://pfp.png')
                    .addFields({ name: `<:steamhappy:${emojiids["steamhappy"]}> funnys`, value: '/dancingh - shows you a dancing h gif\n/dancing <letter/number/symbol> - show a dancing letter, number or smybol of your choice\n/dancingwords <words> - make your words out of dancing letters!\n/ping - pong!' })
                await confirmation.update({ embeds: [helpinfoembed], components: [] });
            } else if (confirmation.customId === 'useful') {
                const helpinfoembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle('useful category')
                    .setThumbnail('attachment://pfp.png')
                    .addFields({ name: `<:helpful:${emojiids["helpful"]}> useful`, value: '/help - shows you this help page\n/hbotinfo - some info about h bot' })
                await confirmation.update({ embeds: [helpinfoembed], components: [] });
            } else if (confirmation.customId === 'currency') {
                const helpinfoembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle('currency category')
                    .setThumbnail('attachment://pfp.png')
                    .addFields({ name: `<:hoint:${emojiids["hoint"]}> currency`, value: '/hointsbalance - shows you your hoints balance\n/hointgiver - gives you one single hoint\n/hointsgamble - get -50 to 50 hoints\n/hointleaderboard - top 10 people with the most hoints' })
                await confirmation.update({ embeds: [helpinfoembed], components: [] });
            } else if (confirmation.customId === 'hfacts') {
                const helpinfoembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle('h facts category')
                    .setThumbnail('attachment://pfp.png')
                    .addFields({ name: `<:nerd:${emojiids["nerd"]}> h facts`, value: '/hacts <OPTIONAL:userfacts> - shows you a random fact! userfacts turns on user submitted facts\n/submithfact - submit an h fact for review!' })
                await confirmation.update({ embeds: [helpinfoembed], components: [] });
            } else if (confirmation.customId === 'devcommands') {
                const helpinfoembed = new EmbedBuilder()
                    .setColor(0xef2213)
                    .setTitle('dev commands category')
                    .setThumbnail('attachment://pfp.png')
                    .addFields({ name: `<:devicon:${emojiids["devicon"]}> dev commands`, value: '/reload <command> - reloads a command\n/restartbot - restart the bot (ONLY WORKS IF YOU STARTED BOT WITH PM2)' })
                await confirmation.update({ embeds: [helpinfoembed], components: [] });
            }
        } catch (e) {
            await interaction.editReply({ content: 'you didnt choose a category in 1 minute...', components: [], ephemeral: true });
        }
	},
};
