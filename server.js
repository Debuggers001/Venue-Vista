const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 80;

// Serve static files from the Images folder
app.use(express.static(path.join(__dirname, 'Images')));

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const api = fs.readFileSync(path.join(__dirname, 'api.html'), 'utf8');

app.get('/', (req, res) => {
    res.send(index);
});

app.post('/submit', (req, res) => {
    const eventName = req.body.eventName;
    const eventLocation = req.body.eventLocation;
    const eventDate = req.body.eventDate;

    console.log(eventName);
    console.log(eventLocation);
    console.log(eventDate);

    fs.writeFileSync('event.json', JSON.stringify({ eventName, eventLocation, eventDate }));
    res.send(api);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
