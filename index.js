const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client, Databases, Query, ID } = require('node-appwrite');
const app = express();

const port = process.env.PORT || 3000;
const databaseID = process.env.CLIP_DATABASE_ID;
const clipCollectionID = process.env.CLIP_COLLECTION_ID;

//Create Appwrite client and get database service
const appwrite = new Client()
    .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
    .setProject(process.env.PILCC_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);
const db = new Databases(appwrite);

//Express settings
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/assets/favicon.ico')));
app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {    
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/:id(*)', (req,res) => {
    const id = req.params.id;
    db.listDocuments(databaseID, clipCollectionID, [Query.equal('ID', id)]).then((clips) => {
        const clip = clips.documents[0];
        if (clip && clip.total != 0) {
            res.render('get-clip', { clipContent: clip.content });
            if (clips.documents[0].lifetime == 'viewed')
                db.deleteDocument(databaseID, clipCollectionID, clip.$id);
        }
        else
            res.sendFile(`${__dirname}/public/create-clip.html`);
    }).catch((e) => {
        console.log(e);
        res.send();
    });
});

app.post('/:id(*)', (req,res) => {
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