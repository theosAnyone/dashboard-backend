require('dotenv').config();
const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const {logger, logEvents} = require('./middleware/logger')
const PORT = process.env.PORT || 3500



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 100, // limiter chaque Ip a 100 requetes par window
    // ... autres configs
})

connectDB()



app.use(logger)

app.use(cors(corsOptions))

app.use(limiter)

app.use(express.json({limit:'50mb'}))

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users',require('./routes/userRoutes'))
app.use('/teachers',require('./routes/teacherRoute'))
app.use('/reviews',require('./routes/reviewRoutes'))
app.use('/discordBot',require('./routes/discordBotRoutes'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
})

mongoose.connection.on('error',err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErr.log')
})