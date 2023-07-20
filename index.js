const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path')

const app = express();
connectDB()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/static/images', express.static(path.join(__dirname, 'static/images')))

const auth = require('./routers/api/auth.js')
app.use('/api/auth', auth)

const upload = require('./routers/api/upload.js')
app.use('/api/upload', upload)

const post = require('./routers/api/post.js')
app.use('/api/post', post)

const users = require('./routers/api/users.js')
app.use('/api/users', users)

const profile = require('./routers/api/profile.js')
app.use('/api/profile', profile)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));