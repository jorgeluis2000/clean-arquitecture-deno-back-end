import { config as cfg } from "dotenv";

const config = cfg()

export const DB_URL: string = Deno.env.get("DB_URL") as string || config.DB_URL as string