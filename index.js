require('dotenv').config();
const express = require('express');
const router = require('./routes/router');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});

