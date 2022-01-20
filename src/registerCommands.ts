// From discordjs.guide modified for light typescript
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import fs from 'fs'

import {Command} from './types'

const token = process.env.TOKEN
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID

if (token == undefined || clientId == undefined || guildId == undefined) {
	throw new Error(`Missing required secrets`)
}

const commands: unknown[] = []
for (const file of fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'))) {
	const command: Command = require(`./commands/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	 .catch(e => {
		 console.error(e)
		 throw new Error('Could not register application commands')
	 })
