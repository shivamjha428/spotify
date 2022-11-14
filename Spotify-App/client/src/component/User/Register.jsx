import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CSS/login.css'

const Register = () => {

    let navigate=useNavigate()
  
    const [data, setdata]=useState({
      name:"",
      email:"",
      password:""
     
  })

  const handleclick =(e)=> {
    e.preventDefault()
    

    axios({
        method:"POST",
        url:"http://localhost:8080/user/register",
        data:data
    }).then((user)=> {
      window.alert(user.data)
      navigate('/')
    }).catch((err)=> {
        window.alert(err.response.data)
    })

  }

  return (
    <div className='login-register'>
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            <NavLink className='nav' to="/" >Already registered?</NavLink>
            
            <span className="link-primary" >
              
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e)=>setdata({...data,name:e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e)=>setdata({...data,email:e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e)=>setdata({...data,password:e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleclick}>
                SignUp
              
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register