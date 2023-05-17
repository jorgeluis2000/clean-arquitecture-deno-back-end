// @deno-types="npm:@types/express"
import { Request, Response } from 'express'
// @deno-types="npm:@types/ip"
import ipClient from 'ip'
// @deno-types="npm:@types/geoip-lite"
import geoip from 'geoip-lite'
import axios from 'axios'
import { URL_GEO } from "@infrastructure/utils/constants/Server.constant.ts"

export default class AlternativeController {
    constructor() {}

    async myGeo(req: Request, res: Response) {
        try {
            const sentIp = ipClient.address('public', 'ipv4')
            const responseAxios = await axios.get(`${URL_GEO}&ip_address=${sentIp}`)
            const resGeo = geoip.lookup(sentIp)
            return res.status(200).json({
                ok: true,
                myIp: `This is your IP ${req.ip}`,
                sentIp: `This is your IP ${sentIp}`,
                resGeo,
                infoIp: responseAxios
            })
        } catch (error) {
            return res.status(400).json({
                ok: false,
                message: "Some error",
                error
            })
        }
    }
}