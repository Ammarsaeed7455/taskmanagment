import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import './Signin.scss'
import { useRef } from 'react'
import axios from 'axios'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
export default function Signin() {
    const emailinput = useRef()
    const passinput = useRef()
    const navigate = useNavigate()
    const logfun = (event) => {
        event.preventDefault()
        let logobj = {
            email: emailinput.current.value,
            password: passinput.current.value
        }
    
        axios.post("https://tasksapp.integration25.com/api/auth/login",logobj,{}).then((res)=>{
            console.log(res.data)

            let username = res.data.data.username
            localStorage.setItem("username", username)
            let token = res.data.data.token
            localStorage.setItem("token", token)
            navigate('/home')

    
        }).catch((err)=>{
            alert("Email or Password is Wrong")
        })

        
}
  return (
    <div className='page'>
     <div className="image">
        <div className="img"></div>

        </div>
        <div className="login-page">
            <form onSubmit={logfun} className="log-in">
            <h1>Log In to your Account</h1>
            <p>See what is going on with your business</p>
            <button className='google'><FontAwesomeIcon className='googlei' icon={faGoogle} /> Continue with google</button>
            <div className="or"><div className="line"></div>Or continue with Email<div className="line"></div></div>
            <h6>Email</h6>
            <input  id='input' ref={emailinput} type="email" placeholder='Enter Your email' />
            <h6>Password</h6>
            <div className="eye">
            <input id='input' ref={passinput} type="text" placeholder='Enter Your password' />
            <FontAwesomeIcon className='googlei' icon={faEye} />
            </div>
            <div className="check"><input id='check' type="checkbox"/> <p>Forgot Password?</p></div>
            <button className='loginbut' >Log in</button>
            </form>
        </div>
    </div>
  )
}
