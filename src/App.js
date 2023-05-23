
import './App.css';
import { Router, Routes, Route } from "react-router-dom"
import Profile from './components/Profile';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Cookies from 'universal-cookie'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import Editprofile from './components/Editprofile';
import Setting from './components/Setting';
import axios from 'axios'
import Popupwindow from './components/Popupwindow';
import Userprofile from './components/Userprofile';
import { useNavigate } from 'react-router-dom';
import Searchpage from './components/Searchpage';
import cover from '../src/components/css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'
import Popupwindowevent from './components/Popupwindowevent';
import logo from './components/css/hhlogo.png'

function App() {
  const navigate = useNavigate();
  const cookie = new Cookies()
  const [searchmessage,setsearchmessage] = useState({query:''})
  const[sendlog,setsendlog]=useState(false)

  const[loading,setloading]=useState(false)
  const [profiledata,setprofiledata]=useState({name:'',profileimg:''})

  const [followloading, setfollowloading] = useState(false)
  const [follow, setfollow] = useState('follow')
  const [followerlist, setfollowerlist] = useState({ followers: [] })

  const open_dropdown=()=>{
    $('#dropdown').toggleClass('none').toggleClass('flex')
    $('#pointer').toggleClass('bx-chevron-down').toggleClass('bx-chevron-up')
  }

  const changequery=(e)=>{
    setsearchmessage({...searchmessage,[e.target.name]:e.target.value})
  }

  const[logstatus,setlogstatus]=useState(false)

  const collapse_sidebar = async () => {

    $('#route').toggleClass('route-expand')




    console.log("collapsing");
    document.querySelector('#menubtn').classList.toggle('icon-center')


    const x = await document.querySelectorAll(".center-a");
    console.log(x.length);
    for (let i = 0; i < x.length; i++) {

      document.querySelectorAll(".center-a")[i].classList.toggle("center-span");

    }
    
    
    
    
    
    const a = await document.querySelectorAll(".side-a");
    console.log(a.length);
    for (let i = 0; i < a.length; i++) {

      document.querySelectorAll(".side-a")[i].classList.toggle("col");

    }
    const b = await document.querySelectorAll("img");
    console.log(b.length);
    for (let i = 0; i < b.length; i++) {

      document.querySelectorAll("img")[i].classList.toggle("col");

    }
    const c = await document.querySelectorAll(".sidebar");
    console.log(c.length);
    for (let i = 0; i < c.length; i++) {

      document.querySelectorAll(".sidebar")[i].classList.toggle("reduce");

    }
    const d = await document.querySelectorAll(".bx-broadcast");
    console.log(d.length);
    for (let i = 0; i < d.length; i++) {

      document.querySelectorAll(".bx-broadcast")[i].classList.toggle("col");

    }
    const e = await document.querySelectorAll(".side-span");
    console.log(e.length);
    for (let i = 0; i < e.length; i++) {

      document.querySelectorAll(".side-span")[i].classList.toggle("span-center");

    }
  }




  
    const signout=async(e)=>{
      e.preventDefault()
      axios.post('http://localhost:7000/users/logout', {
        withCredentials: true
    }).then(async(res)=>{
      console.log(res)
      
      await cookie.remove('logtoken')
     window.open('/','_self')
     
  }).catch((e)=>{
      console.log(e)
})
  }

  
  const close_logout_message=()=>{
    $('#popup-logout-window').addClass('hide')

    

  }
  
  
  
  const submit_query=(e)=>{
    e.preventDefault()
    console.log(searchmessage)
    navigate(`/queryresult/${searchmessage.query}`)

  }


  const display_signout=()=>{
    $('#popup-logout-window').removeClass('hide')

  }







  





  


  useEffect(()=>{
    const check = cookie.get('logtoken')
    if(check){
      console.log("sksk")
      setlogstatus(true)
    }
    else{
      setlogstatus(false)

    }

  },[cookie,sendlog])




  
  
  
  
  
  useEffect(()=>{
    setloading(false)

    axios.get('http://localhost:7000/users/getdetails', {
      withCredentials: true
    }).then(async(res) => {
      console.log(res.data)
      var a = await res.data.name.split(' ')
      setprofiledata({
        name: a[0],
        
        profileimg: res.data.profileimg,
       })
      console.log(profiledata)

    }).catch((e) => {
      console.log(e)
    })
    setloading(true)

  },[loading])






  useEffect(() => {
    setfollowloading(true)
    axios.get(`http://localhost:7000/comment/getfollows`, {
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






  return (
    (logstatus===false)? <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<Login/>} />
    </Routes>:
    <div className="window">
       <div className="popup-profile-window hide" id='popup-profile-window'>
          <Popupwindow/>
        </div>
        <div className="popup-event-window hide" id='popup-event-window'>
          <Popupwindowevent/>
        </div>
        <div className="popup-logout-window hide" id='popup-logout-window'>
          <div className="log-warning">
            <span><p>Do you want to Log out?</p><i class='bx bx-x' onClick={close_logout_message}></i></span>
            <span className="btn"><button onClick={signout}>Log out</button></span>
          </div>
        </div>
        


      <div className="App" id='app-main'>
        
        {/*---------------------------------------------- nav -------------------------------------------------*/}
        <nav className="nav">
          <span className="logo"><img src={logo} alt="loading" /></span>
          <span className="search"><form><input type="text" placeholder='search' name='query' onChange={changequery} /><button><i class='bx bx-search-alt-2' onClick={submit_query}></i></button></form></span>
          <span className="menu">
          
          <img class='bx bxl-product-hunt' src={(profiledata.profileimg!=='')?profiledata.profileimg:cover} alt='loading' onClick={open_dropdown}/><i class='bx bx-chevron-down' id='pointer' onClick={open_dropdown}></i>
          <div className="dropdown none" id ='dropdown'>
              <span><i class='bx bxl-product-hunt' ></i><a href="/profile">{profiledata.name.split(' ')[0]}</a></span>
              <span className="profilebutton"><button>View profile</button></span>
              <hr/>
              <span className="setting"><a href="/settings">Setting</a></span>
              <span className="Edit"><a href="/editprofile">Edit profile</a></span>
              <hr/>
              <span className="signout" onClick={display_signout}>Sign out</span>
              
              
            </div></span>

        </nav>

        <div className="content">
{/*------------------------------------------------------ sidebar -----------------------------------------------*/}
          <div class="sidebar reduce">
            <aside>
              <div class="buttons">
                <span className='side-span' id='menubtn'><i class='bx bx-menu' onClick={collapse_sidebar}></i></span>
              </div>
              <div class="icons">
                <span className='side-span'><a href="/" className='center-a'> <i class='bx bx-home'></i>
                  <p className='side-a col'>Home</p></a> 
                </span>
                <span className='side-span'> <a href='/profile' className='center-a'> <i class='bx bxl-product-hunt'></i>
                  <p className='side-a col'>{profiledata.name}</p></a> 
                </span>
                <span className='side-span'> <a href='/settings' className='center-a'> <i class='bx bxs-cog' ></i>
                  <p className='side-a col' >Settings</p></a> 
                </span>

                <hr />
                


              </div>
              <div className="divider">Following</div>
              <div class="icons2">

               {
                (followerlist.followers.length!==0) && followerlist.followers.map((e)=>{
                  return <span className='side-span' key={e._id}><a href={`/userprofile/${e.followid}`} className='center-a'> <img src={(e.followimg!=='')?e.followimg:cover} alt="loading" />
                  <p className='side-a col'>{e.followname}</p></a> 
                </span>
                })
               }

              </div>
              

            </aside>



          </div>

          {/* ------------------------------------------------content ----------------------------------------*/}
          <div className="route" id='route'>
            <Routes>
              <Route path='/profile' element={<Profile />} />
              <Route path='/' element={<Home/>} />
              <Route path='/editprofile' element={<Editprofile/>} />
              <Route path='/settings' element={<Setting/>} />
              <Route path='/userprofile/:userId' element={<Userprofile/>} />
              <Route path='/queryresult/:query' element={<Searchpage/>} />
            </Routes>

          </div>


        </div>




      </div>

    </div>

      

  );
}

export default App;
