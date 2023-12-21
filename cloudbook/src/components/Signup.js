import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
  const navigate = useNavigate()
  const [credential, setCredential] = useState({name:'', email:'', password:'', cpassword:''})

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, password} = credential
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})  
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      props.showAlert('You signed in successfully', 'success')
      navigate('/')
    }
  }
  return (
    <form className="login-main-container">
       <div className="add-note-container">
        <div className="note-form">
          <div className="title-field">
            <h2>Name</h2>
            <input type="text" onChange={onChange} value={credential.name} id="name" name="name" autoFocus/>
          </div>
          <div className="title-field">
            <h2>Email</h2>
            <input type="email" onChange={onChange} value={credential.email} id="email" name="email" autoFocus/>
          </div>
          <div className="desc-field">
            <h2>Password</h2>
            <input type="password" onChange={onChange} value={credential.password} id="password" name="password" />
          </div>
          <div className="desc-field">
            <h2>Confirm Password</h2>
            <input type="password" onChange={onChange} value={credential.cpassword} id="cpassword" name="cpassword" />
          </div>
          <button className="add-btn" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </div>
     </form>
  )
}

export default Signup