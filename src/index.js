const express = require ('express')
require('./Database/mongoose')
const userRouter = require ('./router/users')
const taskRouter = require ('./router/tasks')
const notesRouter = require ('./router/notes')


const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)
app.use(notesRouter)

app.listen(port, ()=>{
    console.log("Server is running on port " + port)
})