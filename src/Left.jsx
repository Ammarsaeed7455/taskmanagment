import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp,faBox,faClose, faRightFromBracket,faEnvelope,faCircleQuestion,faUser,faUserMinus,faClipboardCheck,faBookmark,faBell,faScaleBalanced,faCalendarDays,faGear,faChartLine, faSearch} from '@fortawesome/free-solid-svg-icons'
import './Left.scss'
import React ,{ useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Left() {
    const [username,setUsername] = useState()
    const [deps,setDeps] = useState([])
    const [tokenuser,setTokenuser] = useState()
    const [copdeps,setCopyDeps] = useState([])
    const [none,setNone] = useState("none")
    const [id,setId] = useState()
    const [top,setTop] = useState("no")
    const [del,setDel] = useState("none")
    const navigate = useNavigate()
    const idchangedep = useRef()
    const namechangedep = useRef()
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
    const handledeps = ()=>{
        console.log("hello")
            
        axios.get("https://tasksapp.integration25.com/api/department/index",{
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

    const updatedep = ()=>{
        let objup = {
            name: namechangedep.current.value,
            manager_id: idchangedep.current.value,

        }
        axios.post(`https://tasksapp.integration25.com/api/department/update/${id}`,objup,{
            headers:{
                Authorization: `Bearer ${tokenuser}`
            }

        }).then((res)=>{
            console.log(res)
            alert(res.data.message)
            setNone("none")

        }).catch((err)=>{
            alert(err.response.data.message)
        })
    
    
    }
    const iconscroll = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'

        })
    }
    window.onscroll = function (){
        if(window.scrollY >= 1000){
            setTop("icontotop")
        }else{
            setTop("no")
        }
    
    }


    const deluser = ()=>{
        axios.delete(`https://tasksapp.integration25.com/api/department/delete/${id}`,{
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

        <div  className={`modalchangedata d-${none}`}>
        <FontAwesomeIcon onClick={()=>setNone("none")} className='iconclose' style={{top:"32%"}} icon={faClose} />

            <div style={{height:"170px"}} className="thismodal">
                <div className="head1"><p>Name:</p><p>Manager:</p></div>
                <div className="name">
                    <input ref={namechangedep} type="text" />
                    <input ref={idchangedep} type="text" />
                </div>
                <button onClick={updatedep} className='btn btn-success'>Update</button>
            </div>
        </div>
    <div className='all'>
    <FontAwesomeIcon onClick={iconscroll} className={`icontop ${top}`} icon={faArrowUp} />
        <div className="portfolio">
        <FontAwesomeIcon className='logo' icon={faBox} />
        <h2>{username}</h2>
        </div>
        <ul>
            <li><FontAwesomeIcon className='icon' icon={faChartLine} /> All Deps</li>
            <li onClick={()=> navigate('/allusers')}><FontAwesomeIcon className='icon' icon={faClipboardCheck} /> All Users</li>
            <li><FontAwesomeIcon className='icon' icon={faBookmark} /> Tasks</li>
            <li><FontAwesomeIcon className='icon' icon={faBell} /> Notifacations</li>
            <li><FontAwesomeIcon className='icon' icon={faCalendarDays} /> Calender</li>
            <li><FontAwesomeIcon className='icon' icon={faScaleBalanced} /> Sales</li>
        </ul>
        <div className="line"></div>
        <form onSubmit={logout} className="log-out">
            <button><FontAwesomeIcon className='iconlogout' icon={faRightFromBracket} /> Log Out</button>
        </form>
        
           </div>
           <div className='all2'>
            <div className="header">
                <button id='show' onClick={handledeps}>Show departments</button>
            <div className="search">
            <FontAwesomeIcon className='iconsearch' icon={faSearch} />            
           <input  type="search" onChange={filterdeps} />
           </div>
           <h6>(Reload page after doing any changes)</h6>
           </div>
           <table className="table">
             <thead>
           <tr>
             <th>#</th>
             <th>name of dep</th>
             <th>manager</th>
             <th>employees</th>
           </tr>
         </thead>
           <tbody>
                {copdeps.map((el,index)=>{
                    return(
                        <tr key={index}>

                        
                        <th>{index + 1}</th>
                        <th>{el.name}</th>
                        <th>{el.manager&&el.manager.name}</th>
                        <th>{el.employees.length}</th>
                        <th><button onClick={()=>{
                            let id = el.id
                            setId(id)
                            setNone("flex")}} className='btn btn-success'>Change Data</button></th>
                            <th><button className='btn btn-warning' onClick={()=>{
                            let id = el.id
                            setId(id)
                            setDel("flex")

                                
                            }}>Delete Dep</button></th>
                        </tr>
                        

                    )
                })}
            </tbody>
           </table>    
           </div>

        </div>       
)
}
