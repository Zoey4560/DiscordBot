
// janky/placeholder in-memory database

type Schema = {
	lists: Map<string, string[]>
}

const defaultDatabase = {lists: new Map<string, string[]>()}

export class Database {
	engine: {data: Schema}

	constructor() {
		this.engine = {data: defaultDatabase}
	}
}
