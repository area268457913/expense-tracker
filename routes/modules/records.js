const express = require('express')
const router = express.Router()
const Rec = require('../../models/record')
const Cate = require('../../models/category')


//  新增
router.get('/new', (req, res) => {
  Cate.find()
    .lean()
    .then((cates) => res.render('new', { cates }))
    .catch((error) => console.error(error))
})

router.post('/new', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
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
})
router.put('/:id/', (req, res) => {
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
//  刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Rec.findById(id)
    .then(rec => rec.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router