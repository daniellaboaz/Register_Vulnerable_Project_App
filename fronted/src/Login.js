// frontend/src/login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import validation from './ValidationsFolder/LoginValidation';
import { login } from './api/server';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [numberOfTries, setNumberOfTries] = useState(0);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let error = {};
    if (values.email === "") {
      error.email = "Email should not be empty";
    }
    if (values.password === "") {
      error.password = "Password should not be empty";
    }
  
    // Check if there are NO errors
    if (Object.keys(error).length === 0) {
      // Check if reached 3 tries
      if (numberOfTries >= 2) {
        navigate('/resetpassword');
      } else {
        try {
          const response = await login(values);
  
          if (response && response.message === 'Login successful') {
            navigate('/home');
          } else {
            alert('Invalid email or password');
          }
        } catch (error) {
          console.error(error);
  
          if (error.response && error.response.status === 401) {
            // Handle invalid email or password
            alert('Invalid email or password');
          } else {
            // Handle other errors
            alert('Error occurred while logging in');
          }
        } finally {
          // Increment the number of tries
          setNumberOfTries((prev) => prev + 1);
        }
      }
    } else {
      // Display validation errors
      setErrors(error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              //type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.email && <span className='text-danger'> {errors.email} </span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.password && <span className='text-danger'> {errors.password} </span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Log in
          </button>
          <Link
            to='/signup'
            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
          >
            Create Account
          </Link>
          <Link
            to='/resetpassword'
            style={{ color: 'red' }}
            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
          >
            forgot your password?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
