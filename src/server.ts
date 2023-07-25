import express from 'express'
import 'module-alias/register'
import userRoutes from '../src/routes/user-routes'

const app = express()
const port = 3000

app.use(express.json())
app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
