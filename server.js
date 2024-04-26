const express = require('express')
const cors = require('cors')
const db = require("./config/dbconfig.js")
const bodyParser = require('body-parser')
const router = require('./routes/adminRoutes.js')
const franchiserouter = require('./routes/franchiseRoute.js')
const Courserouter = require('./routes/courseRoute.js')
const Userrouter = require('./routes/userRoute.js')
const LD_router = require('./routes/LDRoute.js')
const dontenv = require("dotenv").config()

const app = express()

const corOptions = {
    origin: 'http://localhost:8080'
}

// server
db.sync({ alter: true })
    .then(() => {
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => console.log("Error: " + err));

// middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(bodyParser.json({ limit: "50000mb" }));
app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 50000 }));

// TEST API

app.get('/api', (req, res) => {
    res.json({
        message: "hello"
    })
})

// Router
app.use('/api/academy', router)
app.use('/api/academy', franchiserouter)
app.use('/api/academy', Courserouter)
app.use('/api/academy', Userrouter)
app.use('/api/academy', LD_router)

//port
const PORT = process.env.PORT || 8080