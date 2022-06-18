const jwt = require('jsonwebtoken')
const users = require ('../models/users')

const auth = async function (req,res,next){
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        const user = await users.findOne({_id:decode._id, 'tokens.token' : token})

        if(!user){
            throw new Error()
        }
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error: "Please authenticate!"})
    }
}

module.exports = auth