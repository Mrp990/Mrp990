const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let db = [
    { id: 1, title: "Why did the scarecrow win an award?", comedian: "Because he was outstanding in his field!", year: 2020 },
    { id: 2, title: "Why don't scientists trust atoms?", comedian: "Because they make up everything!", year: 2019 }
];

app.get('/', (req, res) => {
    res.json(db);
});

app.post('/', (req, res) => {
    const newJoke = req.body;
    newJoke.id = db.length + 1;
    db.push(newJoke);
    res.json(db);
});

app.patch('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedJoke = req.body;
    db = db.map(joke => {
        if (joke.id === id) {
            return { ...joke, ...updatedJoke };
        }
        return joke;
    });
    res.json(db.find(joke => joke.id === id));
});

app.delete('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedJoke = db.find(joke => joke.id === id);
    db = db.filter(joke => joke.id !== id);
    res.json(deletedJoke);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
