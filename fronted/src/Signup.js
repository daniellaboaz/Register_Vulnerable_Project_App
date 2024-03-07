// fronted/src/singup
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import validation2 from './ValidationsFolder/SignupValidation'
//import axios from 'axios'
import { signup } from './api/server';


function Signup() {

    const [values,setValues]= useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const[errors, setErrors]=useState({});

    const handleInput =(event)=>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    };

      const handleSubmit = (event) => {
        event.preventDefault();
        let error = {};
        if (values.name === "") {
          error.name = "Name should not be empty";
        }
        if (values.email === "") {
          error.email = "Email should not be empty";
        }
        if (values.password === "") {
          error.password = "Password should not be empty";
        }
        // Check if there are NO errors
        if (Object.keys(error).length === 0) {
          signup(values)
         .then(res => {
          navigate('/');
          console.log('User signed up successfully');
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          alert("Error during sign-up. Please try again.");
        }
      });
        } else {
          // Display validation errors
          setErrors(error);
        }
      };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-UP</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type='text' placeholder='Enter Name' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'> {errors.name} </span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password} </span>}
                </div>
                <button type='Submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
                <Link to="/adminlogin" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Admin Log-in</Link>
            </form>
        </div>
  
    </div>
  )
}

export default Signup
