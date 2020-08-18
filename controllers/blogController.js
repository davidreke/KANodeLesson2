// 1. create a controlls folder and put blogControllers.js inside it

// we're going to create the following
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

// 1.5
const Blog = require('../models/blog')

// 2.
const blog_index = (req, res) => {
    // cut logic from router.get('/'...

    Blog.find().sort({createdAt: -1})
    .then((result)=>{
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
      console.log(err)
    })
}

// 3.
const blog_details = (req, res) => {
    // cut logic from router.get('/:id'
    const id = req.params.id;
    console.log(id)
  
    Blog.findById(id)
      .then(result => {
        res.render('details', {blog: result,  title: 'Blog Details'})
      })
      .catch(err => {
        console.log(err)
      })
}

// 4.
const blog_create_get = (req, res) => {
    // cut logic from router.get('/:id'
    res.render('create', {title: 'Create a new Blog'})
}

const blog_create_post = (req, res) => {
    // cut logic from router.post('/'
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
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(err => {console.log(err)})
}

module.exports ={
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}