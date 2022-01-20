import { SlashCommandBuilder } from '@discordjs/builders'
import { Command, ExecuteInput } from '../types'
import List from '../models/List'

module.exports = <Command>{
	data: new SlashCommandBuilder()
		.setName('addtolist')
		.setDescription('add an item to the list')
		.addStringOption(option =>
		  option.setName("list")
		    .setDescription("name of the list")
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName("data")
				.setDescription("what do you want to add to the list?")
				.setRequired(true)
		),
	async execute(input: ExecuteInput) {
		const listName = input.interaction.options.getString("list", true)
		const data = input.interaction.options.getString("data", true)

		const list = new List(listName, input.db)
		await list.add(data)
		  .then(() => {
				input.interaction.reply({content: 'Added!', ephemeral: true})
			})
	},
}
