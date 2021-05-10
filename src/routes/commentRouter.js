const router = require('express').Router()
const commentCtrl = require('../../server/controllers/commentCtrl')

router.get('/comments/:id', commentCtrl.getComments)

module.exports = router