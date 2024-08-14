const { EmbedBuilder, AttachmentBuilder, SlashCommandBuilder} = require('discord.js');

const file = new AttachmentBuilder('images/pfp.png');
const weeniemount = new AttachmentBuilder(`images/weeniemount.png`);

module.exports = {
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('hbotinfo')
		.setDescription('some info about h bot'),
	async execute(interaction) {
        const uptime = process.uptime();

        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const uptimemsg = `${hours}h ${minutes}m ${seconds}s`;

        const infoembed = new EmbedBuilder()
            .setColor(0xef2213)
            .setTitle('h bot info')
            .setAuthor({ name: 'h bot', iconURL: 'attachment://pfp.png'})
            .setThumbnail('attachment://pfp.png')
            .addFields(
                { name: 'bot uptime', value: uptimemsg },
            )
            .setFooter({ text: `made with love and h by @weeniemount`, iconURL: 'attachment://weeniemount.png' });
        await interaction.reply({ embeds: [infoembed] });
	},
};
