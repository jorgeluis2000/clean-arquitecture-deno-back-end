import { connect } from 'mongoose'
import { DB_URL } from "@infrastructure/config/environments/Database.env.ts"

export default async function connectionDB(): Promise<void> {
  try {
    const connectDB = await connect(DB_URL)
    console.log(`\n👾 Connected to mongose db ${connectDB.connect.name} 👾\n`)
  } catch (_) {
    console.log('\n❌ Not connect to mongose db ❌\n')
  }
}