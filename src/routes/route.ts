import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', async (req: Request, res: Response) => {
  res.send('oi')
})

export default routes
