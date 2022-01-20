import { SlashCommandBuilder } from '@discordjs/builders'
import { Client, Collection, Command, CommandInteraction } from 'discord.js'

import { Database } from './database'

export type SuperClient = Client & {
	commands: Collection<string, Command>,
	db: Database
}

export type Command = {
	data: SlashCommandBuilder,
	execute: (input: ExecuteInput) => Promise<void>
}

export type ExecuteInput = {
	interaction: CommandInteraction,
	db: Database
}
