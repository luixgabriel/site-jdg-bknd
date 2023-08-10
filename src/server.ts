import express from 'express'
import 'module-alias/register'
import userRoutes from '../src/routes/user-routes'
import postRoutes from '../src/routes/post-routes'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('uploads'))
app.use('/', userRoutes)
app.use('/', postRoutes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
