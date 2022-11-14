const express=require('express')
const songModel=require('../Models/song')

const router=express.Router()


router.post('/addsong', (req,res)=> {
    const {song_name, date, artwork, artist}=req.body
    
    if (!song_name || !date || !artwork || !artist) {
        return res.status(400).send("Please fill the required fields")
    }
    else {
        songModel.findOne({song_name}).then((check)=> {

            if (check){
                songModel.updateOne({song_name}, {$set : {artist:(check.artist).concat(artist), date, artwork}}).then(()=> {
                    return res.status(200).send("Song Added with New Artist Successfully")
                }).catch((err)=> {
                    return res.status(400).send({err})
                })
            }
            
            else {
                songModel.create({song_name, date, artwork, artist}).then(()=> {
                    return res.status(200).send("Song Added Successfully")
                }).catch((err)=> {
                    return res.status(400).send({err})
                })
            }
        })
       
    }
})

router.get("/song", (req,res)=> {
    songModel.find().sort({rating:1}).limit(10).then((data)=> {
        let result=data.reverse()
        res.status(200).send(result)
    }).catch((err)=> {
        res.status(400).send({err})
    })
})

module.exports=router