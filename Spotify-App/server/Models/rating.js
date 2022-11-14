const mongoose=require('mongoose')

const ratingSchema=new mongoose.Schema({
    song_name:String,
    userarr:[],
    rating:Number
})

const ratingModel= mongoose.model('rating', ratingSchema)

module.exports=ratingModel


