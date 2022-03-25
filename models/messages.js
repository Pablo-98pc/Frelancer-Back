const {Schema,model} = require('mongoose');


const messageSchema = new Schema(
    {
    message : {
        text:{ type : String, required : true}
    },
    users : Array,
    
    sender :{
        type: String,
        ref:'User',
    },
    

})

const Messages = model('Message', messageSchema)

module.exports = Messages