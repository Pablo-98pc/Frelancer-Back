const mongoose = require('mongoose');
const connectionString = process.env.MONGOOSE_URI

// conection to mongoose
mongoose.connect(connectionString,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
    .then(()=> {
        console.log('Connection succesful')
    }).catch(err => {
        console.error(err.message)
    })


