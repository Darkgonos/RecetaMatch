const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./routes/connect');
const Recipes = require('./routes/schemaRecipe');
const User = require('./routes/schemaUser');
const apiRoutes = require('./routes/api/api');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {

	app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
