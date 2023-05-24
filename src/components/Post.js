import React, { useEffect, useState } from 'react'
import './css/Post.css'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'
import postimg from './css/download (5).jpeg'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Post({ post }) {
          const navigate = useNavigate();
          const [comments, setcomments] = useState({ comments: '' })
          const [loading, setloading] = useState(true)
          const [commentlist, setcommentlist] = useState({ list: [] })
          


          const location = useLocation();

          const submitcomment = async (e) => {
                    e.preventDefault()
                    $('#message_input').val('')
                    console.log(comments)
                    axios.post(`https://helping-hand-backend.onrender.com/comment/addcomment/${post._id}`, comments, {
                              withCredentials: true
                    }).then(async(res) => {
                              console.log(res.data)
                              
                              setloading(false)
                              


                    }).catch((e) => {
                              console.log(e)

                    })


          }
          const opencomments=()=>{
                    console.log( $(`#${post._id}`))
                    $(`#post-main${post._id}`).toggleClass('br-change')
                    $(`#${post._id}`).toggleClass('none').toggleClass('flex')
                    
                
                
                  }

          const change = (e) => {
                    setcomments({ [e.target.name]: e.target.value })
          }

          const open_profile=()=>{
                    navigate(`/userprofile/${post.user}`)
                    
                  }


          const delete_comment=(id)=>{
                    
                    axios.delete(`https://helping-hand-backend.onrender.com/comment/deletecomment/${id}`,{
                              withCredentials:true
                          }).then(async(res)=>{
                              console.log(res.data)
                              
                              setloading(false)
                           
                            
                            }).catch((e)=>{
                            console.log(e)
                          })

          }        

          useEffect(()=>{
                    console.log(location.pathname)
                    if(location.pathname==='/'){
                              $('.post-main').addClass('expand')

                    }
                    
                    else{
                              $('.post-main').removeClass('expand')

                    }
          },[location.pathname])



          useEffect(()=>{
                    console.log('zxn')
          
                    
                      axios.get(`https://helping-hand-backend.onrender.com/comment/getcomment/${post._id}`,{
                        withCredentials:true
                    }).then(async(res)=>{
                     
                      await setcommentlist({
                        list:res.data
                      })
                      console.log(res.data)
                      
                
                     
                      
                      
                  
                    }).catch((e)=>{
                      console.log(e)
                    })
                    console.log(comments)
                    setloading(true)
                  
                    
                  
                  
                
                   
                    
                    
                
                 
                  },[loading]
                
                  )

          return (
                    <div className='post-main' id={`post-main${post._id}`} >


                              <span className="profile" onClick={open_profile}>{post.username}</span>
                              <span className="topic">{post.topic}</span>
                              <span className="img">{post.description}</span>
                              <span className='small'>{`${post.area}`}</span>
                              <span className='small'>{`${post.Date}`}</span>


                              <span className="buttons0"><button onClick={opencomments}>Explore</button></span>
                              <span className="buttons" id='opento' onClick={opencomments}><i class='bx bxs-comment-detail'></i>{commentlist.list.length} comments</span>
                              <div className="comments none" id={post._id}>
                                        <hr />
                                        <div className="commentbox">
                                                  {
                                                            (commentlist.list.length===0)?<p>No comments</p>:commentlist.list.map((e)=>{
                                                              return <span key={e._id}>
                                                                <span className="user">{e.username}</span>
                                                                <span className="comment-message"><p>{e.comment}</p>{(post.user===e.user)?<i class='bx bxs-message-square-x' onClick={()=>delete_comment(e._id)}></i>:<></>}</span>
                                                                <span className="time">{e.Date}</span>
                                                              </span>

                                                            })
                                                  }



                                        </div>
                                        <form action="" className="commentform">
                                                  <input type="text" name='comments' placeholder='Write comment' onChange={change} id='message_input' />
                                                  <button className="submitcomment" onClick={submitcomment}><i class='bx bx-send'></i></button>

                                        </form>
                              </div>


                    </div>
          )
}

export default Post
