const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hinary')
		.setDescription('encode text to H/h binary or decode H/h binary to text.')
		.addStringOption(option => 
			option.setName('action')
				.setDescription('encode, or decode?')
				.setRequired(true)
				.addChoices(
					{ name: 'encode', value: 'encode' },
					{ name: 'decode', value: 'decode' },
				))
		.addStringOption(option => 
			option.setName('input')
				.setDescription('the text to encode or decode')
				.setRequired(true)),
		
	async execute(interaction) {
		const action = interaction.options.getString('action');
		const input = interaction.options.getString('input');

		function textToBinary(text) {
			return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
		}

		function binaryToCustom(binaryString) {
			return binaryString.replace(/1/g, 'H').replace(/0/g, 'h');
		}

		function customToBinary(customString) {
			return customString.replace(/H/g, '1').replace(/h/g, '0');
		}

		function binaryToText(binaryString) {
			return binaryString.match(/.{1,8}/g).map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
		}

		let result;
		if (action === 'encode') {
			const binaryString = textToBinary(input);
			result = binaryToCustom(binaryString);
		} else if (action === 'decode') {
			const binaryString = customToBinary(input);
			result = binaryToText(binaryString);
		}

		const embed = new EmbedBuilder()
			.setColor(0xef2213)
			.setTitle('conversion complete!')
			.addFields({ name: 'result:', value: result });

		await interaction.reply({ embeds: [embed] });
	},
};