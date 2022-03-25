const messageRouter = require('express').Router()
const Messages = require('../models/messages');
const User = require('../models/User');

messageRouter.post('/getMessages' ,async (request,response)=> {
    try {  
    const {from,to} = request.body
    const messagesWithUser = await Messages.find({users:{
        $all : [from,to]
    }})
    const projectedMessages = messagesWithUser.map((msg)=> {
        return {
            fromSelf : msg.sender === from,
            message : msg.message.text,
        };
    });
    response.json(projectedMessages);
    }catch(e){
        console.error(e)
    }
    
})



messageRouter.post('/sendMessages',async (request,response)=> {
    try {
        const {from,to,message} = request.body;
        const newMessage = new Messages ({
            message:{text:message},
            users:[from,to],
            sender : from
        })
        const reciever = await User.findOne({userName :to})
        const sender = await User.findOne({userName :from})
        console.log(reciever.userName)
        if(!sender.chats.includes(reciever.userName) && !reciever.chats.includes(sender.userName)){
            sender.chats = sender.chats.concat(reciever.userName)
            await sender.save()
            reciever.chats = reciever.chats.concat( sender.userName)
            console.log(reciever)
            await reciever.save()
            await newMessage.save()
            if(newMessage) return response.json(sender.chats)
            else return response.json({msg:'Failed'})
        }
        
        await newMessage.save()
        if(newMessage) return response.json({msg:'succes'})
        else return response.json({msg:'Failed'})
        
        

        
       


    } catch (e) {
        console.error(e)
    }
})

module.exports = messageRouter