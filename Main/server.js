const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

// MIDDLEWARE THAT PARSES URL ENCODED AND JSON DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MIDDLEWARE THAT SERVES STATIC FILES FROM THE 'PUBLIC' FOLDER
app.use(express.static('public'));
// MIDDLEWARE THAT REQUIRES `/api` TOBE USED IN ALL ROUTES ()`./routes/api`).
app.use(require('./routes'));

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// RETURN ROUTES (USE ROUTES)
// app.route(routes); 
app.use(routes);

// ENABLE DEBUG MODE FOR MONGOOSE
mongoose.set('debug', true);

// START THE API SERVER
app.listen(PORT, () => console.log(`API server running on port ${PORT}!`));