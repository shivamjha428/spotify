import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './component/User/Login'
import Register from './component/User/Register'
import Private from './component/Private_component/Private'

import Artist from './component/Artist/Artist'
import Addartist from './component/Artist/Add_artist'
import Song from './component/Song/Song'
import Addsong from './component/Song/Addsong'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route element={<Private/>}>
      <Route path='/artist' element={<Artist/>}/>
      <Route path='/add_artist' element={<Addartist/>}/>
      <Route path='/song' element={<Song/>}/>
      <Route path='/add_song' element={<Addsong/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App