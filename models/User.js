const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    userName:{type:String,unique:true},
    name:String,
    passwordHash:String,
    posts:[{
        type: Schema.Types.ObjectId,
        ref:'Post'
    }],
    likes:[{
        type: String,
    }],
    chats : [{
       type:String
       
    }]
        
    
})

userSchema.set('toJSON',{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User',userSchema)

module.exports = User