const express = require('express');
const app = express();
const mongoose = require('mongoose');
// 2. require blog from blog.js
const Blog = require('./models/blog');


app.set('view engine', 'ejs');

const dbURI =
  "mongodb+srv://davidexample:Looping!@nodeninja.qfuek.mongodb.net/NodeNinja?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {console.log('connected to db')
    app.listen(3000);})
  .catch((err) => console.log(err))



// basic routes
// 2. redirect / to /blogs
app.get('/', (req, res) =>{
  res.redirect('/blogs')
})


app.get("/about", (req, res) => {
  res.render('about', {title: "About"})
});

// blog routes
// 1. create a /blogs get
// 2. redirect / to /blogs
app.get('/blogs', (req, res) => {
  // 3. add a sort from newest to older
  Blog.find().sort({createdAt: -1})
    .then((result)=>{
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
      console.log(err)
    })
})

app.get('/blogs/create' , (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})


app.use((req, res) => {
    res.status(404).render('404',  {title: "404"})
})
