const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
  },
]
const SEED_USER_RECORD = [
  {
    name: '午餐',
    date: '2019.4.23',
    amount: 60,
    userId: 1,
    categoryId: 4,
  },
  {
    name: '晚餐',
    date: '2019.4.23',
    amount: 60,
    userId: 1,
    categoryId: 4,
  },
  {
    name: '捷運',
    date: '2019.4.23',
    amount: 120,
    userId: 1,
    categoryId: 2,
  },
  {
    name: '電影:驚奇隊長',
    date: '2019.4.23',
    amount: 220,
    userId: 2,
    categoryId: 3,
  },
  {
    name: '租金',
    date: '2015.4.01',
    amount: 25000,
    userId: 1,
    categoryId: 1,
  },
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map((seed_user, index) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seed_user.password, salt))
        .then(hash => {
          return User.create({
            name: seed_user.name,
            email: seed_user.email,
            password: hash,
          }).then(user => {
            return Promise.all(
              SEED_USER_RECORD.map(item => {
                if (item.userId === 1 && index === 0) {
                  return Record.create({ ...item, userId: user._id })
                } else if (item.userId === 2 && index === 1) {
                  return Record.create({ ...item, userId: user._id })
                }
              })
            )
          })
        })
    })
  ).then(() => {
    console.log('record&user create done.')
    process.exit()
  })
})
