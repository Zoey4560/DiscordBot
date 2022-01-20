import { Database } from '../database'

export default class List {
	id: string
	db: Database
	list: string[] = []

	constructor(id: string, db: Database) {
		this.id = id
		this.db = db

		const data = this.db.engine.data
		if (!data) { throw new Error('no DB data') }

		const list = data.lists.get(this.id)
		if (!!list) {
			this.list = list
		}
	}

	async add(input: string) {
		if (this.list.includes(input)) { return }
		this.list.push(input)
		await this.updateDb()
	}

	async remove(input: string) {
		const i = this.list.indexOf(input)
		if (i == -1) { return }
		this.list.splice(i, 1)
		await this.updateDb()
	}

	async updateDb() {
		const data = this.db.engine.data
		if (!data) { throw new Error('no DB data') }
		data.lists.set(this.id, this.list)
		return
		// await this.db.engine.write()
		// NOTE don't need without proper db? tmp in memory
	}
}
