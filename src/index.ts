// importing packages
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './modules'

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

// middlewares
app.use(express.json({ limit: '10MB'}))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

// port
const port = process.env.PORT || 5500
app.listen(port, () => console.log(`Listening on Port: ${port}`))
