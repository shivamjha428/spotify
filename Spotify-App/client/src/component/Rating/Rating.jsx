import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import axios from 'axios'

const MyComponent = (props) => {

  const token=localStorage.getItem("authorization")

  const [rate,setrate]=useState(0)

  // Catch Rating value
  const handleRating = async (e) => {
    setrate(e)
    let data={
      song_name:props.song_name,
      user_email:token, 
      user_rate:e
    }
      
    axios({
      method:"POST",
      url:"http://localhost:8080/rating",
      data:data
    }).then((user)=> {
      window.alert("Rating Added Successfully")
      window.location.reload();
    }).catch((err)=> {
      window.alert(err)
    })
  }

  useEffect(()=> {
 
  },[rate])

  

  return (
    <div className='App'>

      <Rating onClick={handleRating}/>

    </div>
  )
}


export default  MyComponent