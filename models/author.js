const mogoose = require('mongoose')
const Book = require('./book') 
const authorSchema = new mogoose.Schema({
    name: {
        type: String,
        required: true
    }
})
authorSchema.pre('remove', function (next) {
    Book.find({ author: this.id }, (err, books) => {
        if(err) {
            next(err) // Prevent removing due to error like failing connection
        } else if(books.length > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})

const Author = new mogoose.model('Author', authorSchema)

module.exports = Author