const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const guildCommands = [];

function getCommandFiles(dir) {
	let files = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files = files.concat(getCommandFiles(fullPath));
		} else if (entry.isFile() && entry.name.endsWith('.js')) {
			files.push(fullPath);
		}
	}
	return files;
}

const commandFiles = getCommandFiles('./commands');

for (const file of commandFiles) {
	const command = require(path.resolve(file));
	
	// Check if command has required properties
	if ('data' in command && 'execute' in command) {
		const json = command.data.toJSON();
		
		// Add integration types and contexts for user install commands
		const extras = {
			integration_types: [0, 1], // 0 for guild, 1 for user
			contexts: [0, 1, 2], // 0 for guild, 1 for app DMs, 2 for GDMs and other DMs
		};
		Object.assign(json, extras);
		
		// Check if command should be guild-only (dev commands)
		if (json.name === 'reload' || json.name === 'restartbot' || json.name === 'restart') {
			guildCommands.push(json);
		} else {
			commands.push(json);
		}
	} else {
		console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
	}
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} global application (/) commands.`);
		console.log(`Started refreshing ${guildCommands.length} guild-specific application (/) commands.`);
		
		if (commands.length > 0) {
			const data = await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands }
			);
			console.log(`Successfully reloaded ${data.length} global application (/) commands.`);
		}
		
		if (guildCommands.length > 0) {
			const dataGuild = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: guildCommands }
			);
			console.log(`Successfully reloaded ${dataGuild.length} guild-specific application (/) commands in guild ${guildId}.`);
		}
		
		console.log('Finished refreshing commands.');
	} catch (error) {
		console.error(error);
	}
})();
