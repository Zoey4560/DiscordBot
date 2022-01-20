import { SlashCommandBuilder } from '@discordjs/builders'
import { Command, ExecuteInput } from '../types'
import List from '../models/List'

module.exports = <Command>{
	data: new SlashCommandBuilder()
		.setName('deletefromlist')
		.setDescription('delete an item from the list')
		.addStringOption(option =>
		  option.setName("list")
		    .setDescription("name of the list")
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName("data")
				.setDescription("what do you want to remove from the list?")
				.setRequired(true)
		),
	async execute(input: ExecuteInput) {
		const listName = input.interaction.options.getString("list", true)
		const data = input.interaction.options.getString("data", true)

		const list = new List(listName, input.db)
		await list.remove(data)
		  .then(() => {
				input.interaction.reply({content: 'Removed!', ephemeral: true})
			})
	},
}
