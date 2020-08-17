// 9. require mongoose and schema from mongoose.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// 10 create a new schema. It takes an object that has all the properities. There is a second optional argument that is an options argument.

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{timestamps: true});

// timestamps : true will auto create time stamps

// 11. create a constant to store/create this model in using mongoose.model . It takes two arguments
// 1) Name of the model (It shoudl be singular, and look for the plural o this in collections in the mongoDB)
// 2) The schema we just created.
const Blog = mongoose.model('Blog', blogSchema)

// 12 export
module.exports = Blog;