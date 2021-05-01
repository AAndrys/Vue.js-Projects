const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text()); 
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.35:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
const customers = [
    { id: 1, login: 'admin', password: 'admin1' },
    { id: 2, login: 'tak', password: 'nie' },
    { id: 3, login: 'user', password: '123' }
];

app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(customers);
});
// app.post('/yes', (req, res) => {
//     const user = {
//         // id: customers.length + 1,
//         login: req.body.login,
//         password: req.body.password
//     };
//     console.log(user);
// });

app.post('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const loginAuth = customers.find(user => user.login === req.body.login);
    console.log(loginAuth.password);

    if (loginAuth == null) {
        return res.status(400).send('Nie znaleziono użytkownika');
    }
    try {
        if (req.body.password === loginAuth.password) {
            res.send('d688c4ccd7e20183b67f80d8816a2126');
            res.send('Zalogowano!');
            console.log('Logged');
        }
        else {
            res.send('Brak uprawnień!');
        }
    }
    catch {
        res.status(500).send();
    }
});

//////// PORT ////////////
app.listen(port, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Express server running...');
    }
})