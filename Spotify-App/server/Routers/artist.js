const express=require('express')
const Artistmodel=require('../Models/artist')
const router=express.Router()

router.post('/add_artist', (req,res)=> {
    const {artist_name, birth_date, bio}=req.body

    if(!artist_name || !birth_date || !bio) {
        return res.status(400).send("Please provide all Required details")
    }
    else {

        
        Artistmodel.findOne({artist_name}).then((check)=> {

            if(check) {
                Artistmodel.updateOne({artist_name}, {$set :{song:(check.song).concat(bio)}}).then((data)=> {
                    // console.log(data)
                    res.status(200).send("Artist Added with New Song")
                }).catch((err)=> {
                    res.status(400).send(err)
                })
            }
            else {
                Artistmodel.create({
                    artist_name, birth_date, song:[bio]
                }).then(()=> {
                    res.status(200).send("New Artist Added")
                }).catch((err)=> {
                    res.status(400).send(err)
                })
            }
        }).catch((err)=> {
            res.status(400).send({err})
        })
       
    }
    
})

router.get('/artist', (req,res)=> {
    Artistmodel.find().then((data)=> {
        let result=data.reverse().slice(0,10)
        res.status(200).send(result)
    }).catch((err)=> {
        res.status(400).send(err)
    })
})


module.exports=router