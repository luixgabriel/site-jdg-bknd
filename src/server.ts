import express from 'express'
import routes from './routes/route'

const app = express()
const port = 3000

app.use('/', routes)
app.use(express.json())

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
