const mon = require('mongoose')

mon.connect('mongodb://127.0.0.1:27017/task-manager',{
    useNewUrlParser: true   
})
    
