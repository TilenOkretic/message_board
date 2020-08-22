const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    img_url: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

/**
 * 
 * @param {Joi} Joi 
 */
function create(message) {
    if(!message.username){
        message.username = "Anonymus"
    }
    const result = schema.validate(message);
    console.log("Validation:", result);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

/**
 * @param {db} db
 */
function deleteAll(){
    return messages.drop();
}

module.exports = {
    getAll,
    create,
    deleteAll
};