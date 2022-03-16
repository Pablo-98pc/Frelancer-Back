require('dotenv').config()
require('./mongo')
const Post = require('./models/Post')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const User = require('./models/User')
app.use(cors())

app.use(express.json())





app.get('/api/posts', (request,response)=> {
    Post.find({}).then(posts => {
        response.json(posts)
    })
})

app.get('/api/posts/:id',(request,response,next)=> {
    const  {id} = request.params
    Post.findById(id).then(post =>{
        if(post){
            return response.json(post)
        }else {
            response.status(400).end()
        }
    }).catch(err=> {
       next(err)
    })
    
})
app.post('/api/posts/like/:id', async(request,response)=> {
    const {id} = request.params
    const {userName} = request.body 
    const user = await User.findOne({userName : userName})
    const post = await Post.findById(id)
    try {
        if(!user.likes.includes(id)){
            user.likes = user.likes.concat(id)
            await user.save()
            post.likes = post.likes + 1
            await post.save()
            response.json(id)
        }
        else {
            response.status(400).end()
        }
        
    } catch (error) {
        console.error(error)
    }
})
app.post('/api/posts',async (request,response)=> {
    const {
        description,
        price,
        subject,
        userName,
        tags,
    } = request.body

    const user = await User.findOne({userName : userName})

    const newPost = new Post({
        description,
        price,
        likes : 0,
        date : new Date() ,
        subject ,
        user : userName,
        userCreator : userName,
        tags : tags
    })
   try{
       const savedPost = await newPost.save()
       user.posts = user.posts.concat(savedPost._id)
       await user.save()
       response.json(savedPost)
   } catch(e){
    console.error(e)
   }
   
})
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)

const PORT = 3001;
app.listen(PORT,()=> {
    console.log(PORT)
});
