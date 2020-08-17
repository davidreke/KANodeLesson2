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

  // 1.  Create a sandbox rout

  app.get('/add-blog',(req, res)=> {
    // creates a new instance of a blog document using the model
    // the object takes the properties of the blog
    const blog = new Blog({
      title: 'new blog2',
      // after the first time try new blog2
      snippet: 'about my new blog',
      body: 'more about my new blog'
    });

    // sends this to the database
    blog.save()
      .then((result) =>{
        res.send(result)
      })
      .catch((err) => {
        console.log(err);
      })
    // mongoose will use the blog model and look into the Blogs collection and save it there
    // note, this is an asynchronouse task
    // 2. now load localhost:3000/add-blog
    // check out the url, and the mongoDB collection. The webpae should look like the javascript object
  
  })

  // 3. add a new handler that will give us all the blogs
  app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err)
    })
    // shows us all the blogs and is asynchronous
  })

  // 4. search for a single blog
  app.get('/single-blog', (req, res) => {
    Blog.findById('5f3823aab3125507bc932adc')
      .then((result) => {
        res.send(result)
      })
      .catch((err) =>{
        console.log(err);
      });

    // id is showin the colleciton, and also on all-blogs. Copy from all-blogs
  });


app.get('/', (req, res) =>{
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet:
        "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet:
        "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet:
        "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs:blogs });
})


app.get("/about", (req, res) => {
   
  res.render('about', {title: "About"})
});

app.get('/blogs/create' , (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})


app.use((req, res) => {
    res.status(404).render('404',  {title: "404"})
})
