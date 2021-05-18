const mongoose = require('mongoose')
const Rec = require('../record')
const db = mongoose.connection
const data = [

  {
    name: '早餐',
    category: '飲食',
    date: '2021/04/23',
    amount: '100'
  },

  {
    name: '看電影',
    category: '休閒娛樂',
    date: '2021/04/23',
    amount: '250'
  },

  {
    name: '午餐',
    category: '飲食',
    date: '2021/04/23',
    amount: '500'
  },

  {
    name: '捷運',
    category: '交通',
    date: '2021/04/23',
    amount: '30'
  },

  {
    name: '買衣服',
    category: '其他',
    date: '2021/04/23',
    amount: '1000'
  },

  {
    name: '晚餐',
    category: '飲食',
    date: '2021/04/23',
    amount: '800'
  },
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Rec.create(data)

    .then(() => {
      console.log('insert product done....!');
      return db.close();
    })
    .then(() => console.log('database connection closed'))
    .catch((error) => console.log(error));
});