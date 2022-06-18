
const mon = require ('mongoose')
const val = require ('validator')

const taskSchema = new mon.Schema({
    description: {
        type: String,
        required : true,
        trim: true
    },
    completed:{
        type: Boolean,
        required: true
    },
    owner:{
        type: mon.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
},{
    timestamps: true
})

const tasks = mon.model('Tasks',taskSchema)
module.exports = tasks