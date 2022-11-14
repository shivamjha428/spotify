const express=require("express")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const usermodel=require('../Models/user')

const router=express.Router()




router.post('/register', async (req,res)=> {
   
        const {name, email, password} =req.body

    if (!name || !email || !password) {
        return res.status(400).send("Please fill the required Fields")
    }

    usermodel.findOne({email}).then((check)=> {
        if(check) {
            return res.status(400).send("User Already Exist")
        }else {
            
                
            bcrypt.hash(password, 10).then((hashpassword)=>{
                usermodel.create({name, email, password: hashpassword}).then(()=> {
                    res.status(200).send("User Succesfully Created")
                    }).catch((err)=> {
                    res.status(400).send({err})
                    })
            })
            
        }
    })
    
})


router.post('/login', (req,res)=> {
    const {email, password}=req.body

    if (!email || !password){
        return res.status(400).send('Please fill the required Fields')
    }
    else {
        usermodel.findOne({email}).then((data)=> {
            if(data){
                bcrypt.compare(password, data.password).then((check)=> {
                    if(check){
                        let token=jwt.sign(email, "spotifyappfordeltaxjasonwebtoken")
                        res.status(200).send(token)
                    }else {
                        return res.status(400).send("Invalid Credentials")
                    }
                })
            }
            else {
                return res.status(400).send("User does not Exist")
            }
        }).catch((err)=> {
           return  res.status(400).send({err})
        })
    }
})



module.exports=router