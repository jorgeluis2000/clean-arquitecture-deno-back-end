// @deno-types="npm:@types/express"
import { Router } from 'express'
import AlternativeRouter from "@infrastructure/app/routes/alternative/alternative.route.ts"

const AppRouter = Router()

AppRouter.use('/api/v1', AlternativeRouter )

export default AppRouter