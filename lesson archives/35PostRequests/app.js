const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');


app.set('view engine', 'ejs');
// 3.5 add app.use(express.urlencoded({extended: true}))
// this allows us to accept form data
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

// 4. add a post
app.post('/blogs', (req, res)=> {
  console.log(req.body) 
  // 5. create a new blog
  const blog = new Blog(
    req.body
  )

  // 6. save our new blog
  blog.save()
    .then((result)=>{
      // redirect to the homepage
      res.redirect('/blogs')
    })
    .catch((err)=>{
      console.log(err)
    })
  // now test the console.log
})

app.get('/blogs/create' , (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})


app.use((req, res) => {
    res.status(404).render('404',  {title: "404"})
})
