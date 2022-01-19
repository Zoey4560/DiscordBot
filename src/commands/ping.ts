import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	execute(interaction: CommandInteraction) {
		interaction.reply('Pong!')
	},
}


//TODO reusabile type/implementation for this
// type=/as {data: SlashCommandBuilder, execute: (i: CommandInteraction) => Promise<void>}
