// 0. Our app.js is getting pretty big and unwieldly so we are going to use express router to help with this.
// 1. create a routes folder and put blogRoutes.js in it.
// 2. move the following to blogRoutes.js
// app.get('/blogs'
// app.post('/blogs'
// app.get('/blogs/:id'
// app.delete('/blogs/:id'

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { render } = require('ejs');
// 7 import the router
const blogRoutes = require('./routes/blogRoutes')
// 8 move the const blog to blogRoutes.js


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

const dbURI =
  "mongodb+srv://davidexample:Looping!@nodeninja.qfuek.mongodb.net/NodeNinja?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {console.log('connected to db')
    app.listen(3000);})
  .catch((err) => console.log(err))
const morgan = require('morgan')

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) =>{
  res.redirect('/blogs')
})

app.get("/about", (req, res) => {
  res.render('about', {title: "About"})
});

// 9. add the following to take the place of the blog routes
// 11. add scoping to blogRoutes in app.use
app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404',  {title: "404"})
})
