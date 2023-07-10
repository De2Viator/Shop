const express = require('express');
const fs = require('fs');
const app = express();
const handler = require("./handler");
//обработчик всех запросов корзины
app.use(express.json());
app.use('/', express.static('public'));

app.get('/api/cart', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

app.post('/api/cart', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
});

app.delete('/api/cart', (req, res)=> {
    handler(req, res, 'delete', 'server/db/userCart.json');
})

app.put('/api/cart/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
});

app.put('/api/cart/:id/clear', (req, res) => {
    handler(req, res, 'clear', 'server/db/userCart.json');
});

app.get('/api/products', (req, res) => {
    console.log(cart)
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

app.get('/api/catalog', (req,res)=> {
    fs.readFile('server/db/catalog.json','utf-8', (err,data) => {
        if(err) {
            res.sendStatus(404,JSON.stringify({result:0, text: err}))
        } else {
            res.send(data)
        }
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
