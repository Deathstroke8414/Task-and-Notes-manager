const mon = require ('mongoose')
const val = require ('validator')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const tasks = require('./tasks')
const notes = require ('./notes')

const userSchema = new mon.Schema({
    name: {
        type: String,
        required : true,
        trim: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!val.isEmail(value)){
                throw new Error("Invalid Email!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

 userSchema.virtual('notes', {
    ref: 'Notes',
    localField: '_id',
    foreignField: 'owner'
})
 

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await tasks.deleteMany({ owner: user._id })
    next()
})

userSchema.statics.findingUser=async(email,password)=>{
    const user = await users.findOne({email})
    if(!user){
        throw new Error("Incorrect email or password!")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw new Error("Incorrect email or password!")
    }
    return user
}

userSchema.methods.generation = async function(){
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, 'Geosynthetics')

    user.tokens = await user.tokens.concat({token})
    await user.save()

    return token
}

const users = mon.model('Users', userSchema)
module.exports = users