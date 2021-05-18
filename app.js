const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})