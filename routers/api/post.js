const express = require('express');
const { verifyToken } = require('../../middleware/auth.middleware');
const router = express.Router()
const Post = require('../../models/Post')
const User = require('../../models/User')

async function changePost(posts) {
    const dataPosts = []

    for (const post of posts) {

        const user = await User.findById(post.userId)

        dataPosts.push({ ...post._doc, avatar: user.avatar })
    }
    return dataPosts
}

router.get('/', (req, res) => {
    Post.find()
        .then(async (posts) => {

            const dataPost = await changePost(posts)
            console.log(dataPost)

            res.json(dataPost.reverse())
        })
        .catch((err) => {
            res.status(404).json({ error: "No posts found" })
        })
})

router.post('/', verifyToken, async (req, res) => {
    try {

        const { name, text, file } = req.body
        // console.log(req)

        const post = await new Post({
            userId: req.user._id,
            name,
            text,
            file,
        })

        await post.save()
        res.json(post)


    } catch (error) {
        // console.log(error)
        res.status(400).json({ msg: "Не удалось добавить пост" })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)

        if (String(post.userId) === String(req.user._id)) {
            Post.findByIdAndRemove(req.params.id)
                .then((post) => {
                    res.json({ msg: "task delete" })
                })
        }
        else {
            res.status(400).json({ msg: 'Вы не можете удалить не ваш пост' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Не удалось удалить пост' })
    }
})

router.get('/like/:id', verifyToken, async (req, res) => {
    try {

        // console.log(req.params.id)
        // console.log(req.user._id)

        const post = await Post.findById(req.params.id)

        if (post.like.includes(req.user._id)) {
            //удаляет лайк 

            const newLike = post.like.filter((userId) => {

                // console.log(userId)

                return String(req.user._id) !== String(userId)
            })

            await Post.findByIdAndUpdate(post._id, {
                like: newLike
            })
            res.status(200).json({ msg: 'Лайк удален' })
        }
        else {
            //добавляет лайк 
            await Post.findByIdAndUpdate(post._id, {
                like: [...post.like, req.user._id]
            })
            res.status(200).json({ msg: 'Лайк добавлен' })
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Не удалось поставить like' })
    }
})

router.get('/comment', verifyToken, async (req, res) => {

    const posts = await Post.find()
    // console.log(posts[3].comments)

    // .then((comments) => {
    //     res.json(comments)
    // })
    // .catch((err) => {
    //     console.log(err)
    //     res.status(400).json({ msg: 'Не удалось добавить коментарий' })
    // })

})

router.post('/comment/:id', verifyToken, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)

        const newComment = {
            userId: req.user._id,
            comment: req.body.comment,
            login: req.user.login
        }

        await Post.findByIdAndUpdate(req.params.id, {
            comments: [...post.comments, newComment]
        })
        res.status(200).json(newComment)

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Не удалось добавить коментарий' })
    }
})

router.get('/posts/:id', verifyToken, async (req, res) => {
    try {
        const userPosts = await Post.find({ userId: req.params.id })

        const dataPost = await changePost(userPosts)
        console.log(dataPost)

        res.status(200).json(dataPost.reverse())
    }
    catch (error) {
        res.status(400).json({ msg: 'Посты не найдены' })
    }
})

module.exports = router;