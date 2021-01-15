const mogoose = require('mongoose')

const authorSchema = new mogoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Author = new mogoose.model('Author', authorSchema)

module.exports = Author