const monk = require('monk');
const connection_string = 'localhost/messageboard';
const db = monk(connection_string);

module.exports = db;