const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const guildcommands = [];
//const usercommands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			if (command.data.name == "reload" || command.data.name == "restartbot") {
				guildcommands.push(command.data.toJSON());
			} else {
				commands.push(command.data.toJSON());
				//usercommands.push(command.data.toJSON());
			}
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		console.log(`Started refreshing ${guildcommands.length} guild specific application (/) commands.`);

		/*const extras = {
		  "integration_types": [0, 1], //0 for guild, 1 for user
		  "contexts": [0, 1, 2], //0 for guild, 1 for app DMs, 2 for GDMs and other DMs
		}
		Object.keys(extras).forEach(key => usercommands[key] = extras[key]);
		
		// Later on, send the stuff to discord.
		const datauser = await rest.put(
			Routes.applicationCommands(clientId), 
			{ body: usercommands } // In your implementation, make sure to create an array from all of your commands! Otherwise, it'll take super long to add all of the commands!
		);*/

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		const dataguild = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: guildcommands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		console.log(`Successfully reloaded ${dataguild.length} guild specific application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();