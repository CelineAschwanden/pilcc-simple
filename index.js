const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client, Databases, ID } = require('node-appwrite');
const app = express();

const port = process.env.PORT || 3000;
const databaseID = '63774f0ca290ca42d147';
const clipCollectionID = '63774f1c6bb62419b7b3';

//Create Appwrite client and get database service
const appwrite = new Client()
    .setEndpoint('https://api.ciliscu.com/v1')
    .setProject('6376b5ee8fce919da03f')
    .setKey('99fe1ee4fef4fc3f6bb4424e2dfcfd2d15de11b31084c507a9a6a06b4266882d0d550a2a0df8a7015a246a8eb1dcb3329dda' +
    '1e97b8928d2c1183baf4bbe1b6568573af10e0078fd687a6ddc1b995214534051b62bb04bf183e49e1590dd605ff5a5b027ef742c8a4' +
    '751fab81c7bb56c1bf41afb447558e913816fbe069e0d97c');
const db = new Databases(appwrite);

//Express settings
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {    
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/:id', (req,res) => {
    const id = req.params.id;
    //check in database for this id
    res.sendFile(`${__dirname}/public/create-clip.html`);
});

app.post('/:id', (req,res) => {
    const id = req.params.id;
    const content = req.body.content;
    const lifetime = req.body.lifetime;
    
    db.createDocument(databaseID, clipCollectionID, ID.unique(), {ID: id, content: content, lifetime: lifetime})
    .then(result => {
        res.send();
    }).catch(error => {
        if (error.type == 'document_invalid_structure')
            res.status(400).send('Invalid data submitted');
        else if (error.type == 'document_already_exists')
            res.status(409).send('A clip with this ID already exists');
        else
            res.status(500).send('Failed to create clip');
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})