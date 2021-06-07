const mongoose = require('mongoose')
const Cate = require('../category')
const db = mongoose.connection
const data = [
  {
    name: '家居物業',
    icon: 'fas fa-home',
  },
  {
    name: '交通出行',
    icon: 'fas fa-shuttle-van',
  },
  {
    name: '休閒娛樂',
    icon: 'fas fa-grin-beam',
  },
  {
    name: '餐飲食品',
    icon: 'fas fa-utensils',
  },
  {
    name: '其他',
    icon: 'fas fa-pen',
  },
]

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Cate.create(data)

    .then(() => {
      console.log('insert product done....!');
      return db.close();
    })
    .then(() => console.log('database connection closed'))
    .catch((error) => console.log(error));
});