const mon = require ('mongoose')
const val = require ('validator')

const noteSchema = new mon.Schema({
    title: {
        type: String,
        required : true,
        trim: true
    },
    body:{
        type: String,
        required: true,
        trim: true
    },
    owner:{
        type: mon.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
},{
    timestamps: true
})

const notes = mon.model('Notes',noteSchema)
module.exports = notes