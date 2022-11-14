const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
const port=process.env.PORT || 8080
app.use(cors())
// Routes
const Userroute=require('./Routers/user')
const Artistroute=require('./Routers/artist')
const Songroute=require('./Routers/song')
const Ratingroute=require('./Routers/rating')



app.use(express.json())
app.use(express.urlencoded({extended:false}))


mongoose.connect('mongodb://localhost:27017/spotify').then(()=> {
    console.log("Database Connected")
}).catch((err)=> {
    console.log(err)
})


app.get('/', (req,res)=> {
    res.send("Backeng Work")
})

app.listen(port,()=> {
    console.log(`App listening at port ${port}`)
})

app.use('/user', Userroute)
app.use('/', Artistroute)
app.use('/',Songroute)
app.use('/',Ratingroute)