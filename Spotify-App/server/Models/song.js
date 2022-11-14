const mongoose=require('mongoose')

const songSchema=new mongoose.Schema({
    song_name:String,
    date:String,
    artwork:String,
    artist:[],
    userarr:{
        type:Array
    },
    rating:{
        type:Number,
        default:0
    }
})

const songModel=mongoose.model("songs", songSchema)

module.exports=songModel