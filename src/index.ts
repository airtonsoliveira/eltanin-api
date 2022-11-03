// importing packages
import express from 'express'
import bodyParser from 'body-parser'
import router from './modules/index'

const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(router);

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
