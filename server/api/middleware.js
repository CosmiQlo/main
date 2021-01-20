// const path = require('path')
const express = require('express')

const isAdmin = (req, res, next) =>
  req.user.isAdmin === true
    ? next()
    : res.send("I know what you're trying to do! =< ")

const isRightUser = (req, res, next) => {
  console.log('checking req.user.id', req.user.id)
  console.log('checking req.params.userId', req.params.userId)
  let userId = req.params.userId
  userId = parseInt(userId)
  req.user.id === userId
    ? next()
    : res.send("I know what you're trying to do! =< ")
}

module.exports = {isAdmin, isRightUser}
