const {Schema,model} = require('mongoose');
const postSchema = new Schema({
    description : String,
    price :Number,
    date : Date,
    subject : String,
    userCreator :{
        type: String,
        ref:'User'
    },
    tags :[{
        type:String
    }],
    likes: Number
    
    
})

postSchema.set('toJSON', {
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

    

const Post = model('Post', postSchema);

module.exports = Post;