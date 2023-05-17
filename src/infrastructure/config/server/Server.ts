// @deno-types="npm:@types/express"
import express from 'express'
// @deno-types="npm:@types/request-ip"
import requestIP from 'request-ip'
// @deno-types="npm:@types/ip"
import ipClient from 'ip'
import { REST_PORT, REST_DOMAIN, REST_HTTP } from '@infrastructure/config/environments/server.env.ts'
import AppRouter from "@infrastructure/app/routes/app.route.ts"
import { ServerConstant } from "@infrastructure/utils/constants/Server.constant.ts"
import connectionDB from "@infrastructure/config/database/connect.db.ts"

export default class Server {
    private readonly _httpServer
    private readonly _port: number
    private readonly _domain: string

    constructor() {
        this._port = REST_PORT
        this._domain = REST_DOMAIN
        this._httpServer = express()
        this.middlewares()
        void connectionDB()
        this.healthCheck()
        this.routes()
        this.notFound()
    }

    private routes() {
        this._httpServer.use(AppRouter)
    }

    private healthCheck() {
        this._httpServer.get('/', (req, res) => {
            const clientIP = req.ip
            // deno-lint-ignore no-explicit-any
            const clientIPs = requestIP.getClientIp(req as any)
            const clientAgent = req.header("User-Agent")
            return res.status(200).json({
                ok: true,
                infoIp: `This is your IP ${clientIP}`,
                publicIp: `This is your Public IP ${ipClient.address()}`,
                infoIps: `This is your IP ${clientIPs}`,
                agent: `This is your machine ${clientAgent}`,
                message: '🎆 ¡The service is working now! 🎆'
            })
        })
    }

    private notFound(): void {
        this._httpServer.use('*', (_req, res) => {
            res.status(404).json({
                ok: false,
                message: '😷 Not found this route, try with other route. 😷'
            })
        })
    }

    private middlewares(): void {
        this._httpServer.set('trust proxy', true)
        this._httpServer.use((_, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header(
                'Access-Control-Allow-Headers',
                'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, API-TOKEN'
            )
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, DELETE'
            )
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
            next()
        })

        this._httpServer.use(express.json())
        this._httpServer.use(express.text())
        this._httpServer.use(express.urlencoded({ limit: '20mb', extended: true }))
    }

    public async start() {
        await this._httpServer.listen(this._port, () => {
            const httpsString = (this._domain !== ServerConstant.domain && this._domain !== undefined && this._domain !== '') ? `${(REST_HTTP !== undefined && REST_HTTP) ? ServerConstant.https : ServerConstant.http}${this._domain}/` : `http://${ServerConstant.domain}:${this._port}`
            console.log(`🚀 Server running on the address ${httpsString}`)
            console.log("📕 Close the server with Ctrl + C");
        })
    }
}