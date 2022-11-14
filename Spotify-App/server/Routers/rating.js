const express=require('express')
const ratingModel=require('../Models/song')
const jwt=require('jsonwebtoken')

const router=express.Router()

router.post('/rating', async (req,res) => {

    let {song_name, user_email, user_rate} = req.body

    user_email= await jwt.verify(user_email, "spotifyappfordeltaxjasonwebtoken")

    let userrating={
        user_email,
        user_rate
    }

    ratingModel.findOne({song_name}).then((song)=> {

        if((song.userarr).length===0) {
            ratingModel.findOneAndUpdate({song_name}, 
                {userarr:[...song.userarr, userrating ],
                rating:user_rate
            }).then(()=> {
                return res.status(200).send("Rating Added")
            })
        }
        else {
            let userexist=0

            song.userarr.map((val)=> {
                if((val.user_email)===user_email) {
                    userexist=1
                }
            })

            if (userexist===0) {
                let new_userarr=[...song.userarr, userrating]
                let new_rating=(song.rating+user_rate)/(((song.userarr).length)+1)

                // console.log(new_userarr, new_rating)

                ratingModel.findOneAndUpdate({song_name}, 
                    {userarr:[...new_userarr],
                    rating:new_rating
                }).then((data)=> {
                    // console.log('1', data.userarr)
                    return res.status(200).send("Rating Added")
                })

            }
            else {
                
                let new_rating=0
                let new_userarr = []
                

                song.userarr.map((val, i)=> {
                    
                    if((val.user_email)===user_email) {

                        new_userarr.push(userrating)
                        new_rating += user_rate
                    }
                    else {

                        new_userarr.push(val)
                        new_rating+=val.user_rate
                    }
                })

                
                
                new_rating=new_rating/song.userarr.length

                ratingModel.findOneAndUpdate({song_name}, 
                    {userarr:[...new_userarr],
                    rating:new_rating
                }).then((data)=> {
                
                    return res.status(200).send("Rating Added")
                })
            }
        }
    })
})

module.exports=router




















































































// router.post('/rating', async (req,res)=> {

//     let {song_name, user_rate, user_email} = req.body

//     user_email = await jwt.verify(user_email, "spotifyappfordeltaxjasonwebtoken")

//     let userrating={
//         user_email,
//         user_rate
//     }

//     console.log(userrating)

    

//     ratingModel.findOne({song_name}).then((data)=> {
        

//         if((data.userarr).length!==0) {
            
            
//                 let isuser=0

//                     isuser = (data.userarr).map((val)=> {
//                         if (val.user_email===user_email) {
//                             return 1
//                         }
                        
//                     })

//                 if(isuser) {
//                     console.log("1shad")
//                     let rate=0
//                     let length=0

//                     let newuserarr = (data.userarr).map((val)=> {
//                         if (val.user===user_email) {
//                             rate+=rate+userrating.rate
//                             val.rate=user_rate
//                         }
//                         else {
//                             rate+=rate+val.rate
//                         }
//                         length++
//                     })

//                 rate=rate/length

//                 ratingModel.findOneAndUpdate({song_name}, {$set : {userarr:newuserarr,rating:rate }}).then(()=> {
//                 return res.status(200).send('again song rated')
//                 })
//             }

//             else {
//                 console.log("2shad")
//                 let rate=0
//                     let length=0

//                     let newuserarr = (data.userarr).map((val)=> {
                            
//                             rate+=rate+val.rate
//                             length++

//                     })

//                 rate=(rate+user_rate)/(length+1)

//                 ratingModel.findOneAndUpdate({song_name}, {$set : {userarr:[...data.userarr, userrating],rating:rate }}).then(()=> {
//                 return res.status(200).send('new user  song rated')
//                 })
//             }
//         }


//         else {
//             console.log("3shad")
//             ratingModel.findOneAndUpdate({song_name}, {$set : {userarr:[...data.userarr, userrating], rating:user_rate}}).then(()=> {
//                             return res.status(200).send('song rated')
//                         })
//         }
//     })


// })

// module.exports=router


































































// const {song_name, rating, user}=req.body

// let email= await jwt.verify(user,"spotifyappfordeltaxjasonwebtoken" )

// let userrating={
//     user:email,
//     rate:rating
// }

// ratingModel.findOne({song_name}).then((data)=> {
//     console.log(data.userarr)

//     if(data.userarr) {
//     let isuser=false
//     (data.userarr).map((val)=> {
//         if (val.user===email) {
//             isuser=true
//             return
//         }
//     })

//     if (isuser) {
//         let rate=0
//         let length=0
//         let newuserarr = (data.userarr).map((val)=> {
//             if (val.user===email) {
//                 rate+=rate+rating
//                 return val.rate=rating
//             }
//             else {
//                 rate+=rate+val.rate
//             }
//             length++
//         })

//         rate=rate/length

//         ratingModel.findOneAndUpdate({song_name}, {$set : {userarr:newuserarr,rate:rate }}).then(()=> {
//             return res.status(200).send('again song rated')
//         })
//     }
//     else {
//         let rate=rating
//         let length=1
//         (data.userarr).map((val)=> {
            
//             rate+=rate+val.rate
//             length++
//         })

//         rate=rate/length
//         let newuserarr=[...data.user, userrating]

//         ratingModel.findOneAndUpdate({song_name}, {$set : {userarr:newuserarr,rate:rate }}).then(()=> {
//             return res.status(200).send('song rated')
//         })
//     }
//     }
//     else {
//         ratingModel.findOneAndUpdate({song_name}, {$set : {userarr:userrating,rate:rating }}).then(()=> {
//             return res.status(200).send('song rated')
//         })
//     }
    
// })

