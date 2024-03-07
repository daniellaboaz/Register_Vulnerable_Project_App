// frontend/src/adminpage
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import validation2 from './ValidationsFolder/SignupValidation';
import { signup } from './api/server';
//import { ToastContainer ,toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import DangerouslySetInnerHTML from 'react-dangerously-set-html';
//import DangerouslySetInnerHTML from 'react-dangerously-set-html';
//import DangerousHTML from 'react-dangerously-set-html';


function HomePage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [signupResult, setSignupResult] = useState(null);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    //setValues(prev => ({...prev, [event.target.name]: event.target.value}))

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
        setSignupResult(res);
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
        <h2>Welcome- Home page</h2>
        <h3>Add new user:</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input type='text' placeholder='Enter Name' name='name'
              onChange={handleInput} className='form-control rounded-0' />
            {errors.name && <span className='text-danger'> {errors.name} </span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='text' placeholder='Enter Email' name='email'
              onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'> {errors.email} </span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='Enter Password' name='password'
              onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'> {errors.password} </span>}
          </div>
          <button type='Submit' className='btn btn-success w-100 rounded-0'>Add user</button>
          <Link to='/showusers' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Show users page</Link>
          <Link to='/changepass' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Change password</Link>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log out</Link>

        
        {/* <ToastContainer /> */}

        {/*<p className='show'></p>*/}
        {signupResult && signupResult.username && signupResult.useremail && (
          <div>
            <p>New sign up added with user-name:</p>
            <p className="show" dangerouslySetInnerHTML={{ __html: signupResult.username[0] }}></p>
            {/*{alert("Hello2")}*/}
            <p>Email: {signupResult.useremail}</p>
          </div>
        )}
</form>
      </div>

    </div>
  )
};





export default HomePage;
