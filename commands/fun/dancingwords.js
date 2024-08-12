const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder, Client } = require('discord.js');
const fs = require('fs');

const file = new AttachmentBuilder('images/pfp.png');
module.exports = {
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
        var dancingwordsids = {
            "0": "1272512121116168203",
            "1": "1272512140837650452",
            "2": "1272512160773308426",
            "3": "1272512169719889982",
            "4": "1272512180821954652",
            "5": "1272512188711702570",
            "6": "1272512196382949456",
            "7": "1272512204574425110",
            "8": "1272512213361360906",
            "9": "1272512222173855875",
            "a": "1272512231594262548",
            "b": "1272512256269353031",
            "c": "1272512264750235691",
            "d": "1272512272878534777",
            "e": "1272512288942850048",
            "f": "1272512305090789378",
            "g": "1272512313626460191",
            "h": "1272512333087768646",
            "i": "1272512349764321373",
            "j": "1272512370127667312",
            "k": "1272512383600033917",
            "l": "1272512396640129075",
            "m": "1272512408832704603",
            "n": "1272512427010953278",
            "o": "1272512440432853124",
            "p": "1272512455460913173",
            "q": "1272512470015021119",
            "r": "1272512497529655366",
            "s": "1272512514382499850",
            "t": "1272512526529335377",
            "u": "1272512536448729169",
            "v": "1272512605294034964",
            "w": "1272512614651527251",
            "x": "1272512625464315975",
            "y": "1272512636541468765",
            "z": "1272512636541468765",
            "&": "1272512239760314401",
            "@": "1272512248174219334",
            "$": "1272512281246433422",
            "!": "1272512297545240629",
            "?": "1272512485404053584"
        }
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
                finalstring = `${finalstring}<a:${symboltable[char]}:${dancingwordsids[char]}>`
            } else if (letterRegex.test(char) || numberRegex.test(char)) {
                finalstring = `${finalstring}<a:${char.toLowerCase()}_:${dancingwordsids[char.toLowerCase()]}>`
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
