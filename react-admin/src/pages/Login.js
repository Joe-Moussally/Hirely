import { useEffect, useState } from 'react'
import axios from 'axios'
import { localhost } from '../globalVariables';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const nav = useNavigate()

    const [errorMessage,setErrorMessage] = useState('')

    useEffect(()=>{
        document.getElementById('login-btn').addEventListener('click',handleLogin)
    },[])

    const handleLogin = () => {

        if (document.getElementById('email').value == '' || document.getElementById('password').value == '') {
            displayError('All fields are required')
            return
        }

        const data = new FormData()
        //function to handle signup
        data.append('email',document.getElementById('email').value)
        data.append('password',document.getElementById('password').value)
        axios({
            method:'POST',
            url:'http://'+localhost+':8000/api/login',
            data:data
        }).then(res1 => {
            //check if user is an admin
            axios({
                headers:{'Authorization':'Bearer '+res1.data.access_token},
                method:'POST',
                url:'http://'+localhost+':8000/api/profile'
            }).then(res2 => {
                console.log(res2.data.role)
                if (res2.data.role == 'user') {displayError('Only Admins are allowed')}
                if (res2.data.role == 'admin') {
                    nav('/dashboard')
                }
            })
        }).catch((err) => {
            if (err.response.status == 401) {
                displayError('Email/Password is incorrect')
            }
        })
    }

    //function to display errors
    const displayError = (message) => {
        setErrorMessage(message)
        setTimeout(()=>{
            setErrorMessage('')
        },3000)
    }

    return (
        <>
            <div className="login-container">

                <div className="hero-container">
                    <h1 id='hero-text'>We Are The Bridge Between Talent And Organizations</h1>
                </div>

                <div className="form-container">
                    <img id='hero-logo' src={require('../assets/white-brand.png')}/>
                    <h1 id='form-title'>Admin Panel</h1>
                    <p className='error-message'>{errorMessage}</p>
                    <input type='email' placeholder="Email" className='login-input' id='email'/>
                    <input type='password' placeholder="Password" className='login-input' id='password'/>
                    <button className="outline-button" id='login-btn'>Log In</button>
                </div>

            </div>
        </>
    );
}

export default Login