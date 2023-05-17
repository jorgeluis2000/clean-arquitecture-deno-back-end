// @deno-types="npm:@types/express"
import { Router } from 'express'
import GuardianMiddleware from "@infrastructure/utils/middlewares/Guardian.middleware.ts"
import AlternativeController from '../../controllers/alternative/AlternativeController.ts'

const guardian = new GuardianMiddleware()
const alternativeController = new AlternativeController()

const AlternativeRouter = Router()

AlternativeRouter.get("/alternative", guardian.guardianAuth, (_req, res) => {
    return res.status(200).json({
        ok: true,
        message: "Hello World!!!"
    })
})

AlternativeRouter.get("/free/:name?", (req, res) => {
    const  { name } = req.params
    const message = `Hello ${(name !== undefined) ? name : "World"}!!!!`
    return res.status(200).json({
        ok: true,
        message
    })
})

AlternativeRouter.get("/mygeo", alternativeController.myGeo)

export default AlternativeRouter