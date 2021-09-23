const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const api1 = require('./routes/workoutRoutes.js');
const api2 = require('./routes/homeRoutes.js');

const PORT = process.env.PORT || 3001;

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoutDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(api1);
app.use(api2);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});