// fronted/src/resetpassword
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './ValidationsFolder/Resetvalidation';

function Resetpassword() {

    const [values,setValues]= useState({
        email: '',
    });
    const navigate = useNavigate();
    const[errors, setErrors]=useState({});

    const handleInput =(event)=>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = validation(values);
        setErrors(err);
    
        if (err.email === '') {
            try {
                const response = await fetch('http://localhost:8081/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email }),
                });
    
                if (response.ok) {
                    // Parse the response to get the reset token
                    const { resetToken, error } = await response.json();

                    if (resetToken) {
                        console.log("Token: ", resetToken);
                        navigate('/continureset');
                      } else {
                        // Handle error (user not registered under the email)
                        console.error('User not registered:', error);
                        setErrors({ email: error });
                      }

                    
                } else {
                    console.error('Failed to send reset token');
                    alert(` ${await response.text()}`);
                }
            } catch (error) {
                console.error('Error sending reset token:', error);
            }
        }
    };
    
    

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>reset your password</h2>
            <form action="" onSubmit={handleSubmit} >
                <div className='mb-3'>
                    <label ><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>submit code to email</button>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
            </form>
        </div>
      
    </div>
  )
}

export default Resetpassword
