import React from 'react'
import { useState } from 'react'

import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'
import './css/Popupwindowevent.css'

function Popupwindowevent() {
          const[formdata,setformdata]=useState({
                    topic:'',
                    description:'',
                    image:'',
                    location:''
                  })

                  const [imgdata,setimgdata]=useState('')

                  const close_event_popup=()=>{
                    $('#popup-event-window').addClass('hide')
                    $('#app-main').removeClass('reduceopacity')
                
                  }

                  
                
                  const imgset=(e)=>{
                    console.log(e)
                    var filereader = new FileReader()
                    filereader.readAsDataURL(e.target.files[0])
                    filereader.onload =()=>{
                      console.log(filereader.result)
                      setimgdata(filereader.result)
                      setformdata({...formdata,image:filereader.result})
                    }
                    filereader.onerror =(e)=>{
                      console.log(e)
                     
                    }
                
                  }
                  
                  const change=(e)=>{
                    setformdata({...formdata,[e.target.name]:e.target.value})
                  }

                  const post=(e)=>{
                    e.preventDefault()
                    console.log(formdata)
                    axios.post('http://localhost:7000/events/addevent', formdata, {
                      withCredentials: true
                  }).then((res)=>{
                    console.log(res)
                    window.open('/profile','_self')
                
                  }).catch((e)=>{
                    console.log(e)
                
                  })
                
                  }
  return (
          <form className='eventform'>
          <i class='bx bx-x' onClick={close_event_popup}></i>
          <span className="text">Post Your Need and Services</span>
         
          <span className='headings'>Topic (Use specific keyword,Ex- Medicine)</span>
          <span className="title"><input type="text" name='topic' placeholder='Title' onChange={change} /></span>
          <span className='headings'>Location(Area/city/state)</span>
          <span className="title"><input type="text" name='location' placeholder='Location' onChange={change} /></span>
          <span className='headings'>Write a brief description</span>
          <span className="textarea"><textarea name="description" id="" cols="30" rows="8" placeholder='Description' onChange={change}></textarea></span>
          <span className="buttons"><button type='submit' onClick={post}>POST</button></span>
          
          
        </form>
          
  )
}

export default Popupwindowevent
