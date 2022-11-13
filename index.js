const express = require('express');
const path = require('path');
const { Client } = require('node-appwrite');
const app = express();

const port = process.env.PORT || 3000;
const awClient = new Client()
    .setEndpoint('http://localhost/v1')
    .setProject('6370343438a278066aee')
    .setKey('c2a46b8cbdfb15d28d17dc358fa1e63c6130c2e346d065b42bf087d95e0b2e7c8ed7a8f75c23ea42e8b91d645614b3d7d0263de1b8c86f50b5a3d385648d8f5f4041ffe6fb4683db41563948654e11e7806ff6d18e5c196e96a95aa027b95a8e343163e9f8a21f45fc00131ca8a6760d7c7a9beada4cd46b2964b946985e937a');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {    
    res.sendFile(`${__dirname}/public/index.html`);
});
app.get('/:id', (req,res) => {
    const id = req.params.id;
    //check in database for this id
    res.sendFile(`${__dirname}/public/create-clip.html`);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})