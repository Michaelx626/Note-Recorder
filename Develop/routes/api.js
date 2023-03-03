const api = require('express').Router();
const uuid = require('../helper/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helper/fsUtils');

// reads all the APIs
api.get('/', (req, res) => {
    console.info(`Your ${req.method} has been received for APIs!`);

    readFromFile('Develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

// allows the user to filter API based on the title_id params
api.get('/:id', (req, res) => {
    console.info(`Your ${req.method} has been received for your specific API!`);

    const id = req.params.id
    readFromFile('Develop/db/db.json').then((data) => JSON.parse(data))
    .then((objArray) => {
        const result = objArray.filter((file) => file.id === id);
        return result.length > 0 ? res.json(result) : res.json(`No API with that Id`);
    });
});

// allows the user to post an API
api.post('/', (req, res) => {
    console.info(`Your ${req.method} has been submitted for APIs!`);

    const { title, text } = req.body;

    if (title && text){
        const newApi = {
            title,
            text,
            id: uuid()
        }

        const response = {
            status: 'success',
            body: newApi
        }

        readAndAppend(newApi, 'Develop/db/db.json');
        res.json(response);
        console.info(response);
    } else {
        res.status(400).json('Error! Please provide both a title and a text!');
    }
});

// allows the user to delete a specific API based on the title_id
api.delete('/:id', (req, res) => {
    console.info(`Your ${req.method} has been applied and deleted!`);

    const id = req.params.id;
    readFromFile('Develop/db/db.json').then((data) => JSON.parse(data))
    .then((objArray) => {
        const result = objArray.filter((file) => file.id !== id);

        writeToFile('Develop/db/db.json', result);

        res.json(`Your specific API, ${id}, has been deleted!`);
    });
});

module.exports = api;