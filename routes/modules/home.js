const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id

  let totalAmount = 0
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      return Promise.all(
        records.map(record => {
          totalAmount += record.amount
          record.date = moment(record.date).format('YYYY/MM/DD')
          return Category.findOne({ id: record.categoryId })
            .lean()
            .then(category => {
              record.icon = category.icon

              //console.log(record)
              return record
            })
        })
      )
    })
    .then(records => {
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  //console.log(req.query)
  if (!req.query.sort) {
    return res.redirect('/')
  }
  const sort = req.query.sort

  let totalAmount = 0
  const userId = req.user._id
  if (sort === '6') {
    Record.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(records => {
        return Promise.all(
          records.map(record => {
            totalAmount += record.amount
            record.date = moment(record.date).format('YYYY/MM/DD')
            return Category.findOne({ id: record.categoryId })
              .lean()
              .then(category => {
                record.icon = category.icon
                //console.log(record)
                return record
              })
          })
        )
      })
      .then(records => {
        res.render('index', { records, totalAmount })
      })
      .catch(error => console.error(error))
  } else {
    return Record.find({
      categoryId: sort,
    })
      .lean()
      .then(records => {
        return Promise.all(
          records.map(record => {
            totalAmount += record.amount
            record.date = moment(record.date).format('YYYY/MM/DD')
            return Category.findOne({ id: record.categoryId })
              .lean()
              .then(category => {
                record.icon = category.icon
                //console.log(record)
                return record
              })
          })
        )
      })
      .then(records => {
        res.render('index', { records: records, sort: sort, totalAmount })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router
