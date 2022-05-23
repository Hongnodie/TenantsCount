const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tenantscount', {
    // Should eliminate deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;
