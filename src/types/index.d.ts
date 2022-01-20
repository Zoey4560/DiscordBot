import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export type Command = {
	data: SlashCommandBuilder,
	execute: (i: CommandInteraction) => Promise<void>
}
