import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CSS/login.css'
import { useEffect } from 'react'

const Login = () => {
  let navigate=useNavigate()

  let [data,setdata]=useState({
    email:"",
    password:""
  })

  useEffect(()=> {
    let token=localStorage.getItem("authorization")
    if(token){
      navigate("/song")
    }
  })

  const handlesubmit=(e)=> {
    e.preventDefault()
    
    axios({
      method:'POST',
      url:"http://localhost:8080/user/login",
      data:data
  }).then((token)=> {
      localStorage.setItem("authorization",token.data)
      navigate("/song")
  }).catch((err)=> {
      // console.log(err)
      window.alert(err.response.data)
  })
  }


  return (
    <div className="login-register">
      <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
        <img src="https://cdn-icons-png.flaticon.com/128/5087/5087579.png" alt="" className='login_logo'/>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e)=>setdata({...data,email:e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e)=>setdata({...data,password:e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handlesubmit}>
              SignIn
            </button>
            
          </div>
          <NavLink className='nav' to='/register'>Not Yet Register</NavLink>
        </div>
       
      </form>
    </div>
    </div>
  )
}

export default Login