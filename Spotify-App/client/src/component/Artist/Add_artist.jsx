import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Add_artist.css'

const Add_artist = () => {
    let navigate=useNavigate()

    const [data, setdata]=useState({
        artist_name:"",
        birth_date:"",
        bio:[]
    })

    let submit_artist=(e)=> {
        e.preventDefault()
        // console.log(data)
        axios({
            method:"POST",
            url:"http://localhost:8080/add_artist",
            data:data
        }).then((user)=> {
            // console.log("shadab", user.data)
          window.alert(user.data)
          navigate('/artist')
        }).catch((err)=> {
            window.alert(err.response.data)
        })
    }
    return (
        <div>
            <Navbar/>
    <div className='add_artist_container'>
        <div className='add_artist_container_1'>
            <h4>Artist Name</h4>
            <input className='add_artist_input' type="text" 
            onChange={(e)=>setdata({...data,artist_name:e.target.value})}/>
            <h4>Date Of Birth</h4>
            <input className='add_artist_input' type="date"
            onChange={(e)=>setdata({...data,birth_date:e.target.value})}/>
            <h4>Song</h4>
            <textarea className='add_artist_input' onChange={(e)=>setdata({...data,bio:[e.target.value]})}/>
            <div>
            <NavLink to='/artist'><button className='add_artist_cancel' >cancel</button></NavLink>
            <button className='add_artist_submit' onClick={submit_artist}>Done</button>
            </div>
            
        </div>

        
    </div>
    </div>
  )
}

export default Add_artist