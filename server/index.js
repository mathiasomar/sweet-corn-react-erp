const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./db')

const userRouter = require('./routes/userRoute')
const userAuth = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')
const supplierRoute = require('./routes/supplierRoute')
const purchaseRoute = require('./routes/purchaseRoute')
const brandRoute = require('./routes/brandRoute')
const unitRoute = require('./routes/unitRoute')

const app = express()
const port = 3000

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api/user', userRouter)
app.use('/api/auth', userAuth)
app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/supplier', supplierRoute)
app.use('/api/purchase', purchaseRoute)
app.use('/api/brand', brandRoute)
app.use('/api/brand', brandRoute)
app.use('/api/unit', unitRoute)

// CONNECT TO DATABASE
connectDB(process.env.MONGO_URI)

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))