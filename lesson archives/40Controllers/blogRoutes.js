// 3 require express
const express = require('express')
// 8 continued
const Blog = require('../models/blog');
// 4. setup the router
const router = express.Router();
// 5. use change all occurences to switch router with router in router.get/ app.post/ app.delete

// 12 remove /blogs from all of your routes

router.get('/', (req, res) => {

    Blog.find().sort({createdAt: -1})
      .then((result)=>{
        res.render('index', {title: 'All Blogs', blogs: result})
      })
      .catch((err)=>{
        console.log(err)
      })
  })

  router.post('/', (req, res)=> {
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

  //   10 fix router.get('/blogs/create') by putting it above the router.get('/blogs/:id')
  router.get('/create' , (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})

  router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(err => {console.log(err)})
  })



//   6 export the router.
module.exports = router;