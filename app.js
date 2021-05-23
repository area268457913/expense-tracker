const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const Cate = require('./models/category')
const Rec = require('./models/record')


app.use(express.static('public'))
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
  let totalAmount = 0
  const cates = []
  Cate.find()
    .lean()
    .then((item) => {
      item.forEach((items) => cates.push(items.name))
    })
  Rec.find()
    .lean()
    .then((recs) => {
      recs.forEach((record) => (totalAmount += Number(record.amount))
      )

      res.render('index', { recs, totalAmount, cates })
    })
    .catch(error => console.error(error))
})
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})