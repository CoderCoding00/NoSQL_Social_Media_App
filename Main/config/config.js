// USED THE EXAMPLE IN FOLDER 20 FOLDER TO WRAP MONGOOSE
const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/aggregateDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;