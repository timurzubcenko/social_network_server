const express = require('express');
const { verifyToken } = require('../../middleware/auth.middleware');
const router = express.Router()
const User = require('../../models/User')

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then((profile) => {
            res.json({
                name: profile.name,
                login: profile.login,
                avatar: profile.avatar
            })
        })
        .catch((err) => {
            res.status(404).json({ error: "No user found" })
        })
})

module.exports = router;