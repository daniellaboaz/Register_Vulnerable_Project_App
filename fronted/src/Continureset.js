// fronted/src/continureset
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validation from './ValidationsFolder/ContinureserValidation';
import { continuresett } from './api/server';



function Continureset() {
    const navigate = useNavigate();
    const [values,setValues]= useState({
        email: '',
        code: '',
        password: ''
    });

    const[errors, setErrors]=useState({});

    const handleInput = (event) => {
      setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = validation(values);
        setErrors(err);

        if (err.password === '' && err.email === '') {
          continuresett(values)
            .then((res) => {
              alert('Password reset successful');
              navigate('/');
            })
            .catch((error) => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 400 && error.response.data.error === 'Password cannot be the same as the current or previous 3 passwords') {
                  // Display an alert to the user about the password being the same as old passwords
                  alert(error.response.data.error);
                } else {
                  alert(error.response.data.error);
                }
              } else if (error.request) {
                // The request was made but no response was received
                alert('No response from server');
              } else {
                // Something happened in setting up the request that triggered an Error
                alert ('Error: ' + error.message.data.error);
              }
            });
        }
      };
      
      

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>reset your password</h2>
            <form action="" onSubmit={handleSubmit} >
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <div className='mb-3'>
                    <label ><strong>Enter code from the email</strong></label>
                    <input type="code" placeholder='Enter code' name='code'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.code && <span className='text-danger'> {errors.code} </span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>New Password</strong></label>
                    <input type='password' placeholder='Enter New Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password} </span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>change password</button>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
            </form>
        </div>
      
    </div>
  )
}

export default Continureset
