import { Client, Collection, Intents } from 'discord.js'
import fs from 'fs'

import { Command, SuperClient } from './types'
import { Database } from './database'


const client = new Client({intents: [Intents.FLAGS.GUILDS]}) as SuperClient
client.db = new Database()
client.commands = new Collection()

for (const file of fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'))) {
	const command: Command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return

	const command: Command = client.commands.get(interaction.commandName)
	if (!command) return

	return command.execute({interaction: interaction, db: client.db}).catch(e => {
		console.error(e)
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	})
})


client.once("ready", () => {
	console.log(`Ready to rumble as ${client.user?.tag}`)
})

client.login(process.env.TOKEN)
