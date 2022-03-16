const bcrypt = require('bcrypt')
const jtw = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/User')


usersRouter.get('/', async(request,response)=> {
    console.log('entra')
    const users = await User.find({})
    response.json(users)
})

usersRouter.get('/:userName', async (request,response)=> {
    try {
        const {userName} = request.params
        const singleUser = await User.find({userName:userName})
        response.json(singleUser)
    } catch (error) {
        console.log(error)
    }
    
})

usersRouter.post('/', async(request,response)=> {
   
    const {body} = request
    const {userName,name,password} = body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const Newuser = new User({
        userName,
        name,
        passwordHash })
     try{
    console.log('entra')
    console.log(Newuser)
    const savedUser = await Newuser.save()
    const userToken = {
        id: savedUser._id,
        userName:savedUser.userName
    }
    const token = jtw.sign(userToken,process.env.SECRET)
    response.send({
        name:savedUser.name,
        userName:savedUser.userName,
        token,
        likes : savedUser.likes

    })
    } catch(e){
    response.status(400).json(e)
    console.error(e)
    }
})

module.exports = usersRouter