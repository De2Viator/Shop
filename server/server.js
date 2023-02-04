const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');
require('dotenv').config();

app.use(express.json());
app.use('/', express.static(process.env.DIST_PATH));
app.use('/api/cart', cart);
console.log(process.env.DIST_PATH);

app.get('/api/products', (req, res) => {
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