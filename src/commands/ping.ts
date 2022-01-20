import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import {Command} from '../types'

module.exports = <Command>{
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	execute(interaction: CommandInteraction) {
		return interaction.reply('Pong!')
	},
}
