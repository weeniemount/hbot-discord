const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ownerUserID } = require("../../config.json")

module.exports = {
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('reloads a command (GUILD SPECIFIC)')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('the command to reload')
				.setRequired(true)),
	async execute(interaction) {
		if (interaction.user.id == ownerUserID) {
			const commandName = interaction.options.getString('command', true).toLowerCase();
			const command = interaction.client.commands.get(commandName);

			if (!command) {
				return interaction.reply(`There is no command with name \`${commandName}\`!`);
			}

			delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

			try {
				interaction.client.commands.delete(command.data.name);
				const newCommand = require(`../${command.category}/${command.data.name}.js`);
				interaction.client.commands.set(newCommand.data.name, newCommand);
				await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
			} catch (error) {
				console.error(error);
				await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
			}
		} else {
			const sentembed = new EmbedBuilder()
                .setColor(0xef2213)
                .setTitle(`you dont have permission to execute this command!`)
            return await interaction.reply({ embeds: [sentembed], ephemeral: true});
		}
	},
};