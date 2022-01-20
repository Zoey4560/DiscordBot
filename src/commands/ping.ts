import { SlashCommandBuilder } from '@discordjs/builders'
import {Command, ExecuteInput} from '../types'

module.exports = <Command>{
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	execute(input: ExecuteInput) {
		return input.interaction.reply('Pong!')
	},
}
