import { config as cfg } from "dotenv";

const config = cfg()
export const REST_PORT = Number(Deno.env.get("REST_PORT") as string) || Number(config.REST_PORT as string)
export const REST_DOMAIN = Deno.env.get("REST_DOMAIN") as string || config.REST_DOMAIN as string
export const REST_HTTP = Boolean(Deno.env.get("REST_HTTP")) as boolean || Boolean(config.REST_HTTP) as boolean
export const API_KEY_GEO = Deno.env.get("API_KEY_GEO") as string || config.API_KEY_GEO as string

