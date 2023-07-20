const express = require('express');
const { verifyToken } = require('../../middleware/auth.middleware');
const router = express.Router()
const file = require('../../middleware/file.middleware')

const upload = file.single('img')

router.post('/', upload, verifyToken, (req, res) => {
    // console.log(req.file)
    res.json(req.file.filename)
})

module.exports = router;