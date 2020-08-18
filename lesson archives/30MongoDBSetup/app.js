// 0.5 new problem: app.js is getting way too long. Lets use the express router to solve this.
// 1. create a new folder called routes and put blogRoutes.js into it.
const express = require('express');
const morgan = require('morgan')
const app = express();

app.set('view engine', 'ejs');

app.listen(3000);
const dbURI = 'mongodb + srv://davidexample:Looping!@nodeninja.qfuek.mongodb.net/<dbname>?retryWrites=true&w=majority'

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
