import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MyComponent from '../Rating/Rating'
import Navbar from '../Navbar/Navbar'
import './song.css'

const Song = () => {

    const [data, setdata]=useState([])

    const songarray=()=> {
        axios({
            method:"Get",
            url:"http://localhost:8080/song"
        }).then((data)=> {
            setdata(data.data)
            // console.log(data.data)
            
        })
    }

    useEffect(()=> {
        songarray()
       
    }, [])

    return (
        <div>
            <Navbar/>
        <div className='table_container'>
            <div className='table_container_2'>
                <div className='table_heading_button'>
                <h1 className='table_heading'>Top 10 Songs</h1>
                <NavLink to='/add_song'><button className='table_heading_add' type="">+ Add song</button></NavLink>
                </div>

                <table className='song_table_data'>
                    <thead className='song_head'>
                        <tr >
                            <th className='song_head_data'>Artwork</th>
                            <th className='song_head_data'>Songs</th>
                            <th className='song_head_data'>Date Of Release</th>
                            <th className='song_head_data'>Artists</th>
                            <th className='song_head_data'>Rate</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data.map((val,i)=> {
                            return (
                                <tr className='song_body'>
                                    <td className='song_row_data'><img className='song_image' src={val.artwork} alt=""/></td>
                                    <td className='song_row_data'>{val.song_name}</td>
                                    <td className='song_row_data'>{val.date}</td>
                                    <td className='song_row_data'>{([...new Set(val.artist)]).map((art, i)=> {
                                        if(i===([...new Set(val.artist)].length)-1){
                                            return(
                                                <span className='song_row_data'>{art}</span>
                                            )
                                        }
                                        else{
                                            return(
                                                <span className='song_row_data'>{art},  </span>
                                            )
                                        }
                                        
                                    })}</td>
                                    <td className='song_row_data'><MyComponent song_name={val.song_name}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                

                {/* <div className='table_details'>

                    <div className='table_head table'>
                    <span className='table_head_3'>Artwork</span>
                    <span className='table_head_3'>Songs</span>
                    <span className='table_head_3'>Date Of Release</span>
                    <span className='table_head_3'>Artists</span>
                    <span className='table_head_3'>Rate</span>
                    </div>

                    {
                        data.map((val,i)=> {
                            return (
                                <div className='table_row'>
                                    <span className='table_head_4'>{val.artwork}</span>
                                    <span className='table_head_4'>{val.song_name}</span>
                                    <span className='table_head_4'>{val.date}</span>
                                    <span className='table_head_4'>{val.artist}</span>
                                    <span ><MyComponent/></span>
                                </div>
                            )
                        })
                    }
                    
                </div> */}
            </div>
        </div>
        </div>
    )


}

export default Song