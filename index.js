import Express from 'express'
// eslint-disable-next-line no-unused-vars
import db from './config/db.js'

const app = new Express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})
