// fronted/src/resetpassword
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import validation from './ValidationsFolder/ChangepassValidation';
import { changepass } from './api/server';
import { Link } from 'react-router-dom';

function Changepass() {

    const [values,setValues]= useState({
        email: '',
        password1: '',
        password2: '',
    });

    const navigate = useNavigate();
    const[errors, setErrors]=useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = validation(values);
        setErrors(err);
      
        if (err.email === '' && err.password1 === '' && err.password2 === '') {
          changepass(values)
            .then((res) => {
              alert('Password changed, please sign in');
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
                  alert(error.response.data.message);
                }
              } else if (error.request) {
                // The request was made but no response was received
                alert('No response from server');
              } else {
                // Something happened in setting up the request that triggered an Error
                alert ('Error: ' + error.message);
              }
            });
        }
      };
      
    

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Change your password</h2>
            <form action="" onSubmit={handleSubmit} >
            <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
            </div>
            <div className='mb-3'>
                    <label htmlFor='password1'><strong>Current Password</strong></label>
                    <input type='password' placeholder='Enter current Password' name='password1'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password1 && <span className='text-danger'> {errors.password1} </span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password2'><strong>New Password</strong></label>
                    <input type='password' placeholder='Enter new Password' name='password2'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password2 && <span className='text-danger'> {errors.password2} </span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Change password</button>
                <Link to="/home" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Back to home page</Link>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log out</Link>
            </form>
        </div>
      
    </div>
  )
}

export default Changepass
