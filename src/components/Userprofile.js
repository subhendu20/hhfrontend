import React, { useEffect, useState } from 'react'
import defaultimg from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'

import Post from './Post'
import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import { useParams } from 'react-router-dom';
import './css/userprofile.css'
import { useNavigate } from 'react-router-dom';
import gif from './css/3WyW.gif'

function Userprofile() {
          const navigate = useNavigate();
          const { userId } = useParams()

          const [profiledata, setprofiledata] = useState({ name: '', area: '', state: '', profileimg: '', coverimg: '', about: '' })
          const [loading, setloading] = useState(true)
          const [postlist, setpostlist] = useState({ posts: [] })
          const [postloading, setpostloading] = useState(false)
          const [followloading, setfollowloading] = useState(false)
          const [follow, setfollow] = useState('follow')
          const [followerlist, setfollowerlist] = useState({ followers: [] })


          const open_followlist = () => {
                    $('.dropup-follower-menu').toggleClass('none')
          }

          const followuser = () => {
                    if (follow === 'follow') {
                              axios.get(`https://hhbackend.onrender.com/comment/addfollow/${userId}`, {
                                        withCredentials: true
                              }).then(async (res) => {
                                        console.log(res.data)
                                        setfollow('Unfollow')
                                        setfollowloading(true)




                              }).catch((e) => {

                                        console.log(e)
                              })

                    }
                    else {
                              axios.get(`https://hhbackend.onrender.com/comment/removefollow/${userId}`, {
                                        withCredentials: true
                              }).then(async (res) => {
                                        console.log(res.data)
                                        setfollow('Follow')
                                        setfollowloading(true)




                              }).catch((e) => {

                                        console.log(e)
                              })


                    }
          }


          useEffect(() => {
                    setfollowloading(true)
                    axios.get(`https://hhbackend.onrender.com/comment/followerlist/${userId}`, {
                              withCredentials: true
                    }).then(async (res) => {
                              setfollowerlist({
                                        followers: res.data
                              })
                              




                    }).catch((e) => {

                              console.log(e)
                    })
                    setfollowloading(false)
                    


          }, [followloading])




          useEffect(() => {
                    setfollowloading(true)
                    axios.get(`https://hhbackend.onrender.com/comment/followcheck/${userId}`, {
                              withCredentials: true
                    }).then(async (res) => {
                              console.log(res.data)

                              if (res.data === 'yes') {
                                        setfollow('Unfollow')
                              }
                              if (res.data === 'no') {
                                        setfollow('follow')
                              }






                    }).catch((e) => {
                              console.log(e)
                    })
                    setfollowloading(false)

          }, [followloading])











          // get user details
          useEffect(() => {
                    console.log({ userId })
                    setloading(false)

                    axios.post('https://hhbackend.onrender.com/users/getdetails', { userId }, {
                              withCredentials: true
                    }).then((res) => {
                              console.log(res.data)
                              setprofiledata({
                                        name: res.data.name,
                                        area: res.data.area,
                                        profileimg: res.data.profileimg,
                                        coverimg: res.data.coverimg,
                                        about: res.data.about,
                                        state: res.data.state

                              })


                              console.log(profiledata)

                    }).catch((e) => {
                              console.log(e)
                    })
                    setloading(true)












          }, [loading])

          //get post list
          useEffect(() => {
                    console.log('zxn')
                    setpostloading(false)

                    axios.post('https://hhbackend.onrender.com/post/postlist', { userId }, {
                              withCredentials: true
                    }).then(async (res) => {

                              await setpostlist({
                                        posts: res.data
                              })
                              console.log(res.data)






                    }).catch((e) => {
                              console.log(e)
                    })
                    console.log(profiledata)
                    setpostloading(true)


















          }, [postloading])




          return ((profiledata.name!=='')?
                    <div className='user-profile'>
                              <img className='prof-image' src={(profiledata.profileimg === '') ? defaultimg : profiledata.profileimg} alt="loading" />
                              <div className="banner">
                                        <img src={(profiledata.coverimg === '') ? defaultimg : profiledata.coverimg} alt="loading" />

                              </div>
                              <div className="profile-details">
                                        <div className="about">
                                                  <div className="aboutbox">
                                                            <span className="name">
                                                                      {profiledata.name}

                                                            </span>
                                                            <span className="tagline">
                                                                      {`${profiledata.area} , ${profiledata.state}`}


                                                            </span>
                                                            <span className="about-details">
                                                                      {
                                                                                profiledata.about
                                                                      }


                                                            </span>
                                                            <span className="join-date">
                                                                      <span className="buttons">
                                                                                <span className="followers" onClick={open_followlist}><i class='bx bx-male' ></i>{followerlist.followers.length} Followers
                                                                                          <div className="dropup-follower-menu none">
                                                                                                    {followerlist.followers.length !== 0 && followerlist.followers.map((e) => {
                                                                                                              return <span key={e._id} onClick={()=> navigate(`/userprofile/${e.followerid}`)}><img src={e.followerimg} alt="loading" /><p>{e.followername}</p></span> 

                                                                                                    })

                                                                                                    }</div>

                                                                                </span>
                                                                                <button className="edit" onClick={followuser}>{follow}</button>


                                                                      </span>


                                                            </span>
                                                  </div>

                                        </div>
                                        <div className="posts">
                                                  <span className="heading-postlist">
                                                            Posts
                                                  </span>
                                                  <div className="mypostlist">
                                                            {
                                                                      (postlist.posts.length !== 0) ? postlist.posts.map((e) => {
                                                                                return <Post key={e._id} post={e} />
                                                                      }) : <p className='blank-message'>No post Yet</p>
                                                            }

                                                  </div>



                                        </div>

                              </div>


                    </div>:<img src={gif} className='loading' alt='loading'/>
          )
}

export default Userprofile
