const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    });

    notes.post('/', (req, res) => {
        console.info(`${req.method} request received for notes`);

        const { title, text } = req.body

        if (req.body) {
            const newNote = {
                title,
                text,
                id: uuid(),
            };

            readAndAppend(newNote, './db/db.json');
            res.json('Note added successfully');
        } else {
            res.errored('Error in adding note');
        }
    })

    notes.delete('/:id', (req, res) => {
        console.info(`${req.method} request received for notes`);

        readFromFile('./db/db.json').then((data) => {
            const dbInfo = JSON.parse(data)
            const id = req.params.id;
            const db = [];
            dbInfo.forEach(element => {
                if (element.id === id) {
                    element = "";
                } else {
                    db.push(element);
                }
            });
            writeToFile('./db/db.json', db);
        });
        res.json('Note deleted successfully');
    })

module.exports = notes;