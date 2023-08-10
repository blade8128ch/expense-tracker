if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')

const db = require('../../config/mongoose')

const CATEGORY = [
  {
    id: 1,
    name: '家居物業',
    icon: '<i class="fa-solid fa-house"></i>',
  },
  {
    id: 2,
    name: '交通出行',
    icon: '<i class="fa-solid fa-van-shuttle"></i>',
  },
  {
    id: 3,
    name: '休閒娛樂',
    icon: '<i class="fa-solid fa-face-grin-beam"></i>',
  },
  {
    id: 4,
    name: '餐飲食品',
    icon: '<i class="fa-solid fa-utensils"></i>',
  },
  { id: 5, name: '其他', icon: '<i class="fa-solid fa-pen"></i>' },
]

db.once('open', () => {
  Promise.all(
    CATEGORY.map(item => {
      return Category.create({ ...item })
    })
  ).then(() => {
    console.log('category create done.')
    process.exit()
  })
})
