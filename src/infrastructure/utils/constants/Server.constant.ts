import { API_KEY_GEO } from "../../config/environments/server.env.ts"

export const ServerConstant = {
    domain: 'localhost',
    http: 'http://',
    https: 'https://',
}

export const URL_GEO = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY_GEO}`