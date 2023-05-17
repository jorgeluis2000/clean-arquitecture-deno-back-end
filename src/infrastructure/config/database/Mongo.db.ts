import { Database, MongoClient } from "mongodb"


export default class MongoDB {

    private readonly _client: MongoClient
    private readonly _dbUrl: string
    private _db: Database | null

    constructor(dbUrl: string) {
        this._client = new MongoClient()
        this._dbUrl = dbUrl
        this._db = null
    }


    public async connect() {
        this._db = await this._client.connect(this._dbUrl)
    }

    public getDataBase() {
        return this._db
    }

    public getClient() {
        return this._client
    }
}