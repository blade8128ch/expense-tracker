const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id

  return Record.create({ ...req.body, userId: userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let categoryName = ''

  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      console.log(record)
      if (record.categoryId === 1) categoryName = '家居物業'
      else if (record.categoryId === 2) categoryName = '交通出行'
      else if (record.categoryId === 3) categoryName = '休閒娛樂'
      else if (record.categoryId === 4) categoryName = '餐飲食品'
      else if (record.categoryId === 5) categoryName = '其他'
      res.render('edit', { record, categoryName })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
