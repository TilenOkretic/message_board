const monk = require('monk');
const connection_string = process.env.MONGODB_URI || 'localhost/messageboard';
const db = monk(connection_string);

module.exports = db;