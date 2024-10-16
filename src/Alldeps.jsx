import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBox, faRightFromBracket,faEnvelope,faCircleQuestion,faUser,faUserMinus,faClipboardCheck,faBookmark,faBell,faScaleBalanced,faCalendarDays,faGear,faChartLine, faSearch, faClose, faArrowUp} from '@fortawesome/free-solid-svg-icons'
import './Alldeps.scss'
import React ,{ useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Alldeps() {
    const [username,setUsername] = useState()
    const [deps,setDeps] = useState([])
    const [tokenuser,setTokenuser] = useState()
    const [copdeps,setCopyDeps] = useState([])
    const [none,setNone] = useState("none")
    const [top,setTop] = useState("no")
    const namechangedep = useRef()
    const emailchangedep = useRef()
    const phonechangedep = useRef()
    const passchangedep = useRef()
    const depid = useRef()
    const [id,setId] = useState()
    const [objup,setObj] = useState({})
    const [del,setDel] = useState("none")
    const [sel,setSel] = useState("2")
    const [seladd,setSeladd] = useState("2")

    const navigate = useNavigate()
    const navigate2 = useNavigate()
    const addnamechangedep = useRef()
    const addemailchangedep = useRef()
    const addphonechangedep = useRef()
    const addpasschangedep = useRef()
    const adddepid = useRef()
    const [noneadd, setNoneadd] = useState("none")

    window.onscroll = function (){
        if(window.scrollY >= 1000){
            setTop("icontotop")
        }else{
            setTop("no")
        }
    
    }
    const filterdeps = (event)=>{
    
       let filtervar = deps.filter((el)=>{

        if(el.name.toLowerCase().includes(event.target.value.toLowerCase())){
            return el


        }})
        setCopyDeps(filtervar)

        

    

    }

    
    useEffect(()=>{
        let username = localStorage.getItem("username")
        setUsername(username)
        let token = localStorage.getItem("token")

        setTokenuser(token)
        

    },[])
    const handleusers = ()=>{
        console.log("hello")
            
        axios.get("https://tasksapp.integration25.com/api/user/index",{
            headers:{
                Authorization: `Bearer ${tokenuser}`
            }
        }).then((res)=>{
            let dep = res.data.data
            console.log(res.data.data)
            setDeps(dep)
            setCopyDeps(dep)    

        }).catch((err)=>{
            console.log(err)
        })
    
    }
    const updatedep = (event)=>{
        event.preventDefault()
        setObj({
            name: namechangedep.current.value,
            email:emailchangedep.current.value,
            phone:phonechangedep.current.value,
            password:passchangedep.current.value,
            user_type:sel,
            user_status:"0",
            department_id:"134",
            id:id
            
            

        })

        axios.post(`https://tasksapp.integration25.com/api/user/update/${objup.id}`,{
            name: namechangedep.current.value,
            email:emailchangedep.current.value,
            phone:phonechangedep.current.value,
            password:passchangedep.current.value,
            user_type:sel,
            department_id:depid.current.value,
            user_status:"0"

        },{
            headers:{
                Authorization: `Bearer ${tokenuser}`
            }

        }).then((res)=>{
            console.log(res)
            alert(res.data.data.message)
            setNone("none")


        }).catch((err)=>{
            console.log(err)
            alert(err.message)
        })
    


    }
    const addnewuser = (event)=>{
        event.preventDefault()
        axios.post(`https://tasksapp.integration25.com/api/user/store`,{
            name: addnamechangedep.current.value,
            email:addemailchangedep.current.value,
            phone:addphonechangedep.current.value,
            password:addpasschangedep.current.value,
            user_type:seladd,
            department_id:adddepid.current.value,
            

        },{
            headers:{
                Authorization: `Bearer ${tokenuser}`
            }

        }).then((res)=>{
            console.log(res)
            alert(res.data.message)
            setNoneadd("none")


        }).catch((err)=>{
            console.log(err)
            alert(err.message)
        })
    


    }

    const logout = () => {
        axios.post('https://tasksapp.integration25.com/api/auth/logout',{},{
            headers:{
                Authorization: `Bearer ${tokenuser}`
            }
        }).then((res)=>{
            console.log(res)
            alert(res.data.message)
        }).catch((err)=>{
            alert(err)
        })
        navigate("/")
    }
    const deluser = ()=>{
        axios.delete(`https://tasksapp.integration25.com/api/user/delete/${id}`,{
            headers:{
                Authorization: `Bearer ${tokenuser}`
            }



        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            alert(err)
            console.log(err)
        })
    }
    const iconscroll = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'

        })
    }
           



  return (
    <div className="flex ">
        <div className={`delete d-${del}`}>
        <div className="thismodal">            
            <div className="head1"><p>Are You Sure You Want To Delete This User</p></div>
            <div className="name">
                <button onClick={deluser}>Yes</button>
                <button onClick={()=>setDel("none")}>No</button>
            </div>
            </div>

        </div>
    <form onSubmit={updatedep} className={`modalchangedata d-${none}`}>
            <FontAwesomeIcon onClick={()=>setNone("none")} className='iconclose' icon={faClose} />
        <div className="thismodal">
            <div className="head1"><p>Email:</p><p>Phone:</p></div>
            <div className="name">
                <input ref={emailchangedep} type="text" />
                <input ref={phonechangedep} type="text" />
            </div>
            <div className="head1"><p>Password:</p><p>User Type:</p></div>
            <div className="name">
                <input ref={passchangedep} type="text" />
                <select value={sel} onChange={(select)=>{
                    setSel(select.target.value)
                }} id="select">
                    <option value="">Select User Type</option>
                    <option value="2">employee</option>
                    <option value="1">manager</option>
                    <option value="0">admin</option>


                </select>
            </div>
            <div className="head1"><p>Name:</p><p>Dep ID:</p></div>

            <div className="name">
                <input ref={namechangedep} type="text" />
                <input ref={depid} type="text" />
            </div>
           



            <button className='btn btn-success'>Update</button>
        </div>
    </form>
    <form onSubmit={addnewuser} className={`modalchangedata d-${noneadd}`}>
            <FontAwesomeIcon onClick={()=>setNoneadd("none")} className='iconclose' icon={faClose} />
        <div className="thismodal">
            <div className="head1"><p>Email:</p><p>Phone:</p></div>
            <div className="name">
                <input ref={addemailchangedep} type="text" />
                <input ref={addphonechangedep} type="text" />
            </div>
            <div className="head1"><p>Password:</p><p>User Type:</p></div>
            <div className="name">
                <input ref={addpasschangedep} type="text" />
                <select value={seladd} onChange={(select)=>{
                    setSeladd(select.target.value)
                }} id="select">
                    <option value="">Select User Type</option>
                    <option value="2">employee</option>
                    <option value="1">manager</option>
                    <option value="0">admin</option>


                </select>
            </div>
            <div className="head1"><p>Name:</p><p>Dep ID:</p></div>

            <div className="name">
                <input ref={addnamechangedep} type="text" />
                <input ref={adddepid} type="text" />
            </div>
           



            <button className='btn btn-success'>Add User</button>
        </div>
    </form>
<div className='all'>
<FontAwesomeIcon onClick={iconscroll} className={`icontop ${top}`} icon={faArrowUp} />
    <div className="portfolio">
    <FontAwesomeIcon className='logo' icon={faBox} />
    <h2>{username}</h2>
    </div>
    <ul>
        <li onClick={()=>navigate2('/home')}><FontAwesomeIcon className='icon' icon={faChartLine} /> All Deps</li>
        <li><FontAwesomeIcon className='icon' icon={faClipboardCheck} /> All Users</li>
        <li><FontAwesomeIcon className='icon' icon={faBookmark} /> Tasks</li>
        <li><FontAwesomeIcon className='icon' icon={faBell} /> Notifacations</li>
        <li><FontAwesomeIcon className='icon' icon={faCalendarDays} /> Calender</li>
        <li><FontAwesomeIcon className='icon' icon={faScaleBalanced} /> Sales</li>
    </ul>
    <div className="line"></div>
    <form onSubmit={logout} className="log-out">
        <button ><FontAwesomeIcon className='iconlogout' icon={faRightFromBracket} /> Log Out</button>
    </form>
    
       </div>
       <div className='all2'>
            <div className="header">
                <button id='show' onClick={handleusers}>Show All Users</button>
            <div className="search">
            <FontAwesomeIcon className='iconsearch' icon={faSearch} />            
           <input  type="search" onChange={filterdeps} />
           </div>
           <button onClick={()=>setNoneadd("flex")} className='btn btn-success'>Add New User</button>
           <h6>(Reload page after doing any changes)</h6>

           </div>
           <table className="table">
             <thead>
           <tr>
             <th>#</th>
             <th>Name Of User</th>
             <th>User ID</th>
             <th>User Type</th>
             <th></th>

           </tr>
         </thead>
           <tbody>
                {copdeps.map((el,index)=>{                    
                    return(
                        <tr key={index}>

                        
                        <th>{index + 1}</th>
                        <th>{el.name}</th>
                        <th>{el.id}</th>
                        <th>{el.user_type}</th>
                        <th><button onClick={()=>{
                        let id = el.id
                        setId(id)
                        setNone("flex")
                        }} className='btn btn-success'>Change Data</button></th>
                        <th><button onClick={()=>{
                        let id = el.id
                        setId(id)
                        setDel("flex")
                            

                        }} className='btn btn-danger'>Remove User</button></th>
                        </tr>

                    )
                })}
            </tbody>
           </table>    
           </div>


    </div>       
)
}
