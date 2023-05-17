import { Collection, Database } from "mongodb"
import UserSchema from "@domain/schemas/User.schema.ts"
import UserEntity from "@domain/entities/User.entity.ts"


export default class User {

    private readonly user: Collection<UserSchema>

    constructor(db: Database) {
        this.user = db.collection<UserSchema>("users")
    }

    public async createUser(newUser: UserEntity) {
        const userCreated = await this.user.insertOne(newUser)
        return userCreated
    }

    public getModel() {
        return this.user
    }
}