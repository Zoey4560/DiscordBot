import {Client, Intents} from 'discord.js'
import {REST} from '@discordjs/rest'

// docker build -t db --build-arg TOKEN=%TOKEN% . && docker run --rm -it db

const client = new Client({intents: [Intents.FLAGS.GUILDS]})

client.once("ready", () => {
	console.log(`Ready to rumble as ${client.user?.tag}`)
})



client.login(process.env.TOKEN)
