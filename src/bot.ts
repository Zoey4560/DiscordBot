import {Client, Collection, CommandInteraction, Intents} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import fs from 'fs'


type Command = {data: SlashCommandBuilder, execute: (i: CommandInteraction) => Promise<void>}
type ClientWithCommands = Client & {commands: Collection<string, Command>}

const client = new Client({intents: [Intents.FLAGS.GUILDS]}) as ClientWithCommands


client.once("ready", () => {
	console.log(`Ready to rumble as ${client.user?.tag}`)
})

//from discordjs.guide
client.commands = new Collection()
for (const file of fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'))) {
	const command = require(`./commands/${file}`)
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

client.login(process.env.TOKEN)
