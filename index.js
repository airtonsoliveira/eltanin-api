// importing packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const user = require('./routes/user')
const hello = require('./routes/hello');

// middlewares
app.use(express.json());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// adding routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.use('/hello', hello);
app.get('/user', user.getUsers)
app.get('/user/:id', user.getUserById)
app.post('/user', user.createUser)
app.put('/user/:id', user.updateUser)
app.delete('/user/:id', user.deleteUser)

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
