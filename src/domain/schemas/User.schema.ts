import { ObjectId } from 'mongodb'

export default interface UserSchema {
    _id: ObjectId
    name: string
    username: string
    password: string
}