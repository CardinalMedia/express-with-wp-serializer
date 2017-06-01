const PostController = {}

PostController.create = (req, res) => {
  const Post = req.app.models.Post

  let newPost = {}

  newPost.wpID = req.body.id
  newPost.slug = req.body.slug
  newPost.title = req.body.title.rendered
  newPost.content = req.body.content.rendered
  newPost.excerpt = req.body.excerpt.rendered
  newPost.raw = req.body

  Post.findOrCreate({
    where: {
      wpID: newPost.wpID
    },
    defaults: newPost
  }).spread((post, created) => {
    if(created){
      return res.status(201).json({post: post})
    }

    post.update(newPost)
    .then(post => {
      return res.status(201).json({post: post})
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })

  })
  .catch(error => {
    return res.status(500).json({
      error: error
    })
  })
}

PostController.find = (req, res) => {
  const Post = req.app.models.Post

  let query = {}
  let params = req.query

  if (params.limit) {
    query.limit = params.limit
  }

  if (params.offset) {
    query.offset = params.offset
  }

  Post.findAll(query)
  .then(posts => {
    return res.status(200).json({
      posts: posts
    })
  })
  .catch((err) => {
    return res.status(500).json({
      error: err
    })
  })
}

PostController.findById = (req, res) => {
  const Post = req.app.models.Post

  Post.findById(req.params.id)
  .then((user) => {
    return res.status(200).json({
      post: post
    })
  })
  .catch((err) => {
    return res.status(500).json(err)
  })
}

module.exports = PostController