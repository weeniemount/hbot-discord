const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder, Client } = require('discord.js');
const fs = require('fs');
const emojiids = require('../../modules/emojiids.js');

const file = new AttachmentBuilder('images/pfp.png');
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder({ integration_types: [0,1] })
		.setName('dancingwords')
		.setDescription('make your words out of dancing letters!')
        .addStringOption(option =>
            option.setName('words')
            .setDescription('your words!')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('size')
                .setDescription('text size')
                .setRequired(true)
                .addChoices(
                    { name: 'biggest', value: 'biggest' },
                    { name: 'big', value: 'big' },
                    { name: 'medium', value: 'medium' },
                    { name: 'small', value: 'small' },
                    { name: 'tiny', value: 'tiny' },
                )),
	async execute(interaction) {
        const letterRegex = /^[a-zA-Z]+$/;
        const numberRegex = /^[0-9]+$/;
        const spaceRegex = /\s/;
        var symboltable = {
            "&": "ampersand",
            "@": "at",
            "$": "dollarsign",
            "!": "exclamationpoint",
            "?": "questionmark"
        }
        var wordsinput = interaction.options.getString('words')
        var sizetype = interaction.options.getString('size')
        var finalstring = ""
		for (let char of wordsinput) {
            if (char == "&" || char == "@" || char == "$" || char == "!" || char == "?") {
                finalstring = `${finalstring}<a:${symboltable[char]}:${emojiids[char]}>`
            } else if (letterRegex.test(char) || numberRegex.test(char)) {
                finalstring = `${finalstring}<a:${char.toLowerCase()}_:${emojiids[char.toLowerCase()]}>`
            } else if (spaceRegex.test(char)) {
                finalstring = `${finalstring}    `
            }
        }
        if (sizetype == "biggest") {
            await interaction.reply(`${finalstring}`)
        } else if (sizetype == "big") {
            await interaction.reply(`# ${finalstring}`)
        } else if (sizetype == "medium") {
            await interaction.reply(`## ${finalstring}`)
        } else if (sizetype == "small") {
            await interaction.reply(`### ${finalstring}`)
        } else if (sizetype == "tiny") {
            await interaction.reply(`-# ${finalstring}`)
        } 
	},
};
