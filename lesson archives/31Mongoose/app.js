const express = require('express');
const app = express();
// 2. require mongoose
const mongoose = require('mongoose');

app.set('view engine', 'ejs');





// 4. add database. (for me I add NodeNinja between / and ?)
// 5. Now if we run we get a depricating error. add {useNewUrlParser: true, useUnifiedTopology: true} as an argument
const dbURI =
  "mongodb+srv://davidexample:Looping!@nodeninja.qfuek.mongodb.net/NodeNinja?retryWrites=true&w=majority";
// 3. connect MongoDB
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {console.log('connected to db')
    app.listen(3000);})
  .catch((err) => console.log(err))
  // 6. add a .then and a .catch method to the mongoose.connect method

  // 7. we don't want get request until the connection has been made. Move app.listen into the then method.
  // 8. add a folder called models and a blog.js

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
