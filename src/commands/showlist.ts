import { SlashCommandBuilder } from '@discordjs/builders'
import { Command, ExecuteInput } from '../types'
import List from '../models/List'

module.exports = <Command>{
	data: new SlashCommandBuilder()
		.setName('showlist')
		.setDescription('show all the items in the list')
		.addStringOption(option =>
		  option.setName("list")
		    .setDescription("name of the list")
				.setRequired(true)
		),
	execute(input: ExecuteInput) {
		const listName = input.interaction.options.getString("list", true)
		const list = new List(listName, input.db)

		return input.interaction.reply(list.list.toString() || 'List is empty!')
	},
}
