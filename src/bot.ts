import {Client, Collection, Intents} from 'discord.js'
import fs from 'fs'

import {Command} from './types'

type ClientWithCommands = Client & {commands: Collection<string, Command>}

const client = new Client({intents: [Intents.FLAGS.GUILDS]}) as ClientWithCommands
client.commands = new Collection()

//from discordjs.guide
for (const file of fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'))) {
	const command: Command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName)
	if (!command) return

	return command.execute(interaction).catch(e => {
		console.error(e)
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	})
})


client.once("ready", () => {
	console.log(`Ready to rumble as ${client.user?.tag}`)
})

client.login(process.env.TOKEN)
