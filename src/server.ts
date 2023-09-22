import express, { Request, Response } from 'express'
import 'module-alias/register'
import userRoutes from '@/routes/user-routes'
import postRoutes from '@/routes/post-routes'
import voluntaryRoutes from '@/routes/voluntary-routes'
import jobRoutes from '@/routes/job-routes'
import clientRoutes from '@/routes/client-routes'
import candidateRoutes from '@/routes/candidate-routes'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(resolve(__dirname, './', 'uploads')))
app.use('/users', userRoutes)
app.use('/', postRoutes)
app.use('/', voluntaryRoutes)
app.use('/', jobRoutes)
app.use('/', clientRoutes)
app.use('/', candidateRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('API Running! :)')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
