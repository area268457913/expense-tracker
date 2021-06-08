const express = require('express')
const router = express.Router()
const Rec = require('../../models/record')
const Cate = require('../../models/category')



router.get('/filter', (req, res) => {
  const filter = req.query.filter
  let totalAmount = 0
  const cates = []
  if (filter === '篩選支出') {
    res.redirect('/')
  } else {
    Cate.find()
      .lean()
      .then((items) => {
        items.forEach((item) => cates.push(item.name))
      })
    Rec.find({ category: filter })
      .lean()
      .then((recs) => {
        recs.forEach((record) => (totalAmount += Number(record.amount)))
        res.render('index', { recs, cates, totalAmount, filter })
      })
  }
})



router.get('/', (req, res) => {
  let totalAmount = 0
  const cates = []
  Cate.find()
    .lean()
    .then((items) => {
      items.forEach((item) => cates.push(item.name))
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

module.exports = router
