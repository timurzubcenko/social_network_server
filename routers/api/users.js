const express = require('express');
const { verifyToken } = require('../../middleware/auth.middleware');
const router = express.Router()
const User = require('../../models/User')

router.get('/', (req, res) => {
    User.find()
        .then((users) => {

            const filteredUsers = users.map(user => {
                return {
                    _id: user._id,
                    login: user.login,
                    name: user.name,
                    avatar: user.avatar
                }
            })

            res.json(filteredUsers.reverse())
        })
        .catch((err) => {
            res.status(404).json({ error: "No users found" })
        })
})



module.exports = router;