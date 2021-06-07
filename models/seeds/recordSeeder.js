const mongoose = require('mongoose')
const Rec = require('../record')
const db = mongoose.connection
const data = [

  {
    name: '早餐',
    category: '飲食',
    date: '2021/04/23',
    amount: 100,
    icon: 'fas fa-utensils',
  },

  {
    name: '看電影',
    category: '休閒娛樂',
    date: '2021/04/23',
    amount: 250,
    icon: 'fas fa-grin-beam',
  },

  {
    name: '午餐',
    category: '飲食',
    date: '2021/04/23',
    amount: 500,
    icon: 'fas fa-utensils',
  },

  {
    name: '捷運',
    category: '交通',
    date: '2021/04/23',
    amount: 30,
    icon: 'fas fa-shuttle-van',
  },

  {
    name: '買衣服',
    category: '其他',
    date: '2021/04/23',
    amount: 1000,
    icon: 'fas fa-pen',
  },

  {
    name: '晚餐',
    category: '飲食',
    date: '2021/04/23',
    amount: 800,
    icon: 'fas fa-utensils',
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