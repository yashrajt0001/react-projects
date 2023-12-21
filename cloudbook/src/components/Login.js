import React, { useState } from 'react'
import { useNavigate } from 'react-router'


const Login = (props) => {
    const {showAlert} = props
    let navigate = useNavigate()

    const [credential, setCredential] = useState({email:'', password:''})

    const onChange = (e) => {
       
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleClick = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            showAlert('You logged in successfully', 'success')
            navigate('/')
        }
    }
    return (
    // <div className="login-container">
      <form className="login-main-container">
       <div className="add-note-container">
        <div className="note-form">
          <div className="title-field">
            <h2>Email</h2>
            <input type="email" onChange={onChange} value={credential.email} id="email" name="email" autoFocus/>
          </div>
          <div className="desc-field">
            <h2>Password</h2>
            <input type="password" onChange={onChange} value={credential.password} id="password" name="password" />
          </div>
          <button className="add-btn" type="submit" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
     </form>
    // </div>
  )
}

export default Login