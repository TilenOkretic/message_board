const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const body_parser = require('body-parser');
const messages = require('./db/messages');
const {
    response
} = require('express');

const app = express();


app.use(morgan('tiny'));
app.use(cors());
app.use(body_parser.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        message: "Hello from the server side!"
    });
});

app.get('/messages', (req, res) => {
    messages.getAll().then(msg => {
        res.json(msg);
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then(msg => {
        console.log(msg);
        res.json(msg);
    }).catch(err => {
        res.status(500);
        res.json(err);
    });
});


app.post('/messagesDel', (req, res) => {
    console.log(req.body);
    messages.deleteAll().then(result => {
        res.json(result == true ? "Messages deleted" : "An error has occured");
    })
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});