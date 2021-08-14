//requiring the environment variable
require('dotenv').config()
//importing express
const express = require('express')
const app = express()

const routes = require('./src/routes')

const {get, post, defaultRoute} = require('./src/routes')

// Database config
const connection = require('./db.config')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
    extended: false
}))

app.use('/api/shorten', post);
app.use('/:code', get);
app.use('/', defaultRoute);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))