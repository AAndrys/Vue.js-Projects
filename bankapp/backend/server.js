const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.35:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const customers = [
    { id: 1, login: 'admin', password: 'admin1', origin: 'Poland', evidence: 'Tim Marlo', cardNumber: 765832342, amount: 4030000, currency: 'zł', serverInfo: [{ title: 'Welcome to your own bank account!', desc: 'xdfsfds' }, { title: 'Contact to help center.', desc: 'New function arrived!' }]},
    { id: 2, login: 'user', password: 'user', origin: 'England', evidence: 'User Userski', cardNumber: 674234264, amount: 430000, currency: 'zł', serverInfo: [{ title: 'Welcome to your own bank account!', desc: 'xdfsfds' }, { title: 'Contact to help center.', desc: 'New function arrived!'}]},
    { id: 3, login: 'john', password: 'smith', origin: 'United States', evidence: 'John Smith', cardNumber: 9807428416, amount: 2340000, currency: 'eur', serverInfo: [{ title: 'Welcome to your own bank account!', desc: 'xdfsfds' }, { title: 'Contact to help center.', desc: 'New function arrived!'}]},
    { id: 4, login: 'test', password: 'test', origin: 'Poland', evidence: 'Test User', cardNumber: 6543453654, amount: 434000000, currency: 'zł', serverInfo: [{ title: 'Welcome to your own bank account!', desc: 'xdfsfds' }, { title: 'Contact to help center.', desc: 'New function arrived!' }] },
];

app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(customers);
});

app.post('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const loginAuth = customers.find(user => user.login === req.body.login);
    console.log(loginAuth.login);

    if (loginAuth == null) {
        return res.status(400).send('Nie znaleziono użytkownika');
    }
    try {
        if (req.body.password === loginAuth.password) {
            const userInfo = {
                confirm: 'd688c4ccd7e20183b67f80d8816a2126',
                loginAuth: loginAuth,
            };
            res.send(userInfo);
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
    if (err) {
        console.log(err);
    } else {
        console.log('Express server running...');
    }
})