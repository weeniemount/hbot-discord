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
        
        const backButton = new ButtonBuilder()
            .setCustomId('back')
            .setLabel('back')
            .setEmoji(emojiids["back"])
            .setStyle(ButtonStyle.Secondary);
        
        const devrow = new ActionRowBuilder()
            .addComponents(funnys, useful, currency, hfacts, devcommands);
        const row = new ActionRowBuilder()
            .addComponents(funnys, useful, currency, hfacts);
        
        const helpembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`<:info:${emojiids["info"]}> h bot help`)
            .setAuthor({ name: 'h bot', iconURL: 'attachment://pfp.png'})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'choose a category!', value: 'press a button to display that category!' },
            )
            .setFooter({ text: `made with love and h by @weeniemount`, iconURL: 'attachment://weeniemount.png' });
        const updateInteraction = async (interaction) => {
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async confirmation => {
                if (confirmation.customId === 'funnys') {
                    const helpinfoembed = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle(`<:info:${emojiids["info"]}> funnys category`)
                        .setThumbnail('attachment://pfp.png')
                        .addFields({ name: `<:steamhappy:${emojiids["steamhappy"]}> funnys`, value: '/dancingh - shows you a dancing h gif\n/dancing <letter/number/symbol> - show a dancing letter, number or smybol of your choice\n/dancingwords <words> - make your words out of dancing letters!\n/ping - pong!\n/findtheh - makes a table of letters, find the h!\n/giftsofhvember - time to get gifted in hvember' })
                    await confirmation.update({ embeds: [helpinfoembed], components: [new ActionRowBuilder().addComponents(backButton)] });
                } else if (confirmation.customId === 'useful') {
                    const helpinfoembed = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle(`<:info:${emojiids["info"]}> useful category`)
                        .setThumbnail('attachment://pfp.png')
                        .addFields({ name: `<:helpful:${emojiids["helpful"]}> useful`, value: '/help - shows you this help page\n/hbotinfo - some info about h bot\n/hinary - encode/decode text to/from h binary' })
                    await confirmation.update({ embeds: [helpinfoembed], components: [new ActionRowBuilder().addComponents(backButton)] });
                } else if (confirmation.customId === 'currency') {
                    const helpinfoembed = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle(`<:info:${emojiids["info"]}> currency category`)
                        .setThumbnail('attachment://pfp.png')
                        .addFields({ name: `<:hoint:${emojiids["hoint"]}> currency`, value: '/hointsbalance - shows you your hoints balance\n/hointgiver - gives you one single hoint\n/hointsgamble - get -25 to 50 hoints\n/hointleaderboard - top 10 people with the most hoints\n/sendhoints <user> <hoints> - send someone some hoints!\n/itemshop - look at items available for purchase!\n/buyitem <item> - buy an item from the shop!\n/hointdouble - double your hoints or lose them all\n/hointspin - spin and get some hoints!\n/sellitem - sell an item from your inventory!'})
                    await confirmation.update({ embeds: [helpinfoembed], components: [new ActionRowBuilder().addComponents(backButton)] });
                } else if (confirmation.customId === 'hfacts') {
                    const helpinfoembed = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle(`<:info:${emojiids["info"]}> h facts category`)
                        .setThumbnail('attachment://pfp.png')
                        .addFields({ name: `<:nerd:${emojiids["nerd"]}> h facts`, value: '/hfacts <OPTIONAL:userfacts> - shows you a random fact! userfacts turns on user submitted facts\n/submithfact - submit an h fact for review!' })
                    await confirmation.update({ embeds: [helpinfoembed], components: [new ActionRowBuilder().addComponents(backButton)] });
                } else if (confirmation.customId === 'devcommands') {
                    const helpinfoembed = new EmbedBuilder()
                        .setColor(0xef2213)
                        .setTitle(`<:management:${emojiids["management"]}> dev commands category`)
                        .setThumbnail('attachment://pfp.png')
                        .addFields({ name: `<:devicon:${emojiids["devicon"]}> dev commands`, value: '/reload <command> - reloads a command\n/restartbot - restart the bot (ONLY WORKS IF YOU STARTED BOT WITH PM2)' })
                    await confirmation.update({ embeds: [helpinfoembed], components: [new ActionRowBuilder().addComponents(backButton)] });
                } else if (confirmation.customId === 'back') {
                    await confirmation.update({ embeds: [helpembed], components: [currentserverid == guildId ? devrow : row], ephemeral: true });
                }
            });
            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({ content: 'you didnt choose a category in 1 minute...', components: [], ephemeral: true });
                }
            });
        }
        await interaction.reply({ embeds: [helpembed], components: [currentserverid == guildId ? devrow : row], ephemeral: true });
        updateInteraction(interaction);
	},
};
