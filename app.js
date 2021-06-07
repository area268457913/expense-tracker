const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const Cate = require('./models/category')
const Rec = require('./models/record')
const bodyParser = require('body-parser')


app.use(express.static('public'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

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
//  新增
app.get('/recs/new', (req, res) => {
  const cates = []
  Cate.find()
    .lean()
    .then((item) => {
      item.forEach((items) => cates.push(items.name))
    })
  return res.render('new', { cates })
})

app.post('/recs', (req, res) => {
  const record = req.body
  const category = req.body.category

  Cate.findOne({ name: category })
    .lean()
    .then(function (item) {
      return (record.icon = item.icon)
    })
    .then(() => {
      Rec.create(record).then(() => res.redirect('/'))
    })
    .catch((error) => console.log(error))
})
//  修改
app.get('/recs/:id/edit', (req, res) => {
  const id = req.params.id
  const categoryList = []
  Cate.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item.name))
    })
  return Rec.findById(id)
    .lean()
    .then((rec) => res.render('edit', { rec, categoryList }))
    .catch(error => console.log(error))
})
app.post('/recs/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Rec.findById(id)
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      // 找到特定的category icon並更新修改icon
      Cate.findOne({ name: category })
        .lean()
        .then((item) => {
          record.icon = item.icon
        })
        .then(() => {
          record.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})