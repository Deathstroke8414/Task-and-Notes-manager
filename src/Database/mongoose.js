const mon = require('mongoose')

mon.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true   
})
    
