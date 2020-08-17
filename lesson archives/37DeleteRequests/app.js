

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

const dbURI =
  "mongodb+srv://davidexample:Looping!@nodeninja.qfuek.mongodb.net/NodeNinja?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {console.log('connected to db')
    app.listen(3000);})
  .catch((err) => console.log(err))


app.get('/', (req, res) =>{
  res.redirect('/blogs')
})


app.get("/about", (req, res) => {
  res.render('about', {title: "About"})
});


app.get('/blogs', (req, res) => {

  Blog.find().sort({createdAt: -1})
    .then((result)=>{
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
      console.log(err)
    })
})


app.post('/blogs', (req, res)=> {
  console.log(req.body) 
  const blog = new Blog(
    req.body
  )
  blog.save()
    .then((result)=>{
      res.redirect('/blogs')
    })
    .catch((err)=>{
      console.log(err)
    })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)

  Blog.findById(id)
    .then(result => {
      res.render('details', {blog: result,  title: 'Blog Details'})
    })
    .catch(err => {
      console.log(err)
    })
})

// 4. add a delete request
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
  .then(result => {
    // we are going to send json with a redicrt property
    res.json({redirect: '/blogs'})
  })
  .catch(err => {console.log(err)})
})
// 5 is on details.ejs

app.get('/blogs/create' , (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})


app.use((req, res) => {
    res.status(404).render('404',  {title: "404"})
})
