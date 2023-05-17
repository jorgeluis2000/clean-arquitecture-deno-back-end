import { NextFunction, Request, Response } from 'express/types'
export default class GuardianMiddleware {

    public guardianAuth(req: Request, res: Response, next: NextFunction) {
        const token = req.header("API-TOKEN")

        if (!token && !token?.toLowerCase().startsWith('bearer')) {
            return res.status(401).json({
                ok: false,
                message: "⚠️ Not Autorizated ⚠️"
            })
        } else {
            const myToken = token?.substring(7)
            console.log(myToken);
            next()
        }
    }
}