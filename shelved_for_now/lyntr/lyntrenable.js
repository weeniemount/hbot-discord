const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const database = require('../../modules/database.js');

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('lyntrenable')
		.setDescription('enables lyntr functionallity')
        .addStringOption(option =>
            option.setName('channelid')
            .setDescription('the id of the channel where lyntr posts are going to get sent to')
            .setRequired(true)),
	async execute(interaction) {
        const serverId = interaction.guild.id
        const server = database.prepare('SELECT * FROM servers WHERE id = ?').get(serverId);

        if (server) {
            console.log(`server ${interaction.guild.name} already exists in the database!`)
        } else {
            console.log(`server ${interaction.guild.name} doesnt exist in the database! creating database entry for server...`)
            database.prepare('INSERT INTO servers (id, lyntrenabled, lyntrchannelid) VALUES (?, ?, ?)').run(serverId, false, 0);
        }
        database.prepare('UPDATE servers SET lyntrenabled = ? WHERE id = ?').run(1, serverId);
        database.prepare('UPDATE servers SET lyntrchannelid = ? WHERE id = ?').run(interaction.options.getString('channelid'), serverId);
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle(`lyntr functionallity enabled for this server.`)
            //.setAuthor({ name: 'h bot', iconURL: interaction.client.user.avatarURL()})
            //.setThumbnail('attachment://pfp.png')
		await interaction.reply({ embeds: [exampleEmbed]});
	},
};
