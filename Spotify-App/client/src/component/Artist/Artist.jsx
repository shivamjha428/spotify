import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Artist.css'

const Artist = () => {

    const [data, setdata]=useState([])

    const artistarray=()=> {
        axios({
            method:"Get",
            url:"http://localhost:8080/artist"
        }).then((data)=> {
            setdata(data.data)
            // console.log(data.data)
        })
    }

    useEffect(()=> {
        artistarray()
       
    }, [])

    return (
        <div>
            <Navbar/>
        <div className='table_container'>
            <div className='table_container_2'>
                <div className='table_heading_button'>
                <h1 className='table_heading'>Top 10 Artists</h1>
                <NavLink to='/add_artist'><button className='table_heading_add' type="">+ Add Artist</button></NavLink>
                </div>
                

                <div className='table_details'>

                    <div className='table_head table'>
                    <span className='table_head_1'>Artists</span>
                    <span className='table_head_1'>Date Of Birth</span>
                    <span className='table_head_1'>Songs</span>
                    </div>

                    {
                        data.map((val,i)=> {
                            console.log()
                            return (
                                <div className='table_row'>
                                <span className='table_head_2'>{val.artist_name}</span>
                                <span className='table_head_2'>{val.birth_date}</span>
                                <span className='table_head_2'>
                                {([...new Set(val.song)]).map((show, i)=> {
                                    if(i===([...new Set(val.song)].length)-1)
                                    return(
                                        <span >{show}</span>
                                    )
                                    else {
                                        return(
                                            <span >{show},  </span>
                                        )
                                    }
                                })}
                                </span>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
        </div>
    )


}

export default Artist