// frontend/src/adminpage
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validation from './ValidationsFolder/ShowValidation';
import { showusers2 } from './api/server';


function ShowUsers() {
    const [values,setValues]= useState({
        name: '',
        email: ''
    });

    const[errors, setErrors]=useState({});
    const [users, setUsers] = useState([]);

    const handleInput =(event)=>{
        //setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = validation(values);
        setErrors(err);
    
        if (err.name === ''  && err.email=== '' ) {
            showusers2(values)
            .then(res => {
             //setSignupResult(res);
             if (res.data.length === 0) {
                // No user found in the database
                alert('User not found in the database');
              } else {
             setUsers(res.data);
             console.log(res)
              }
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                  // Unauthorized (401) status, show a specific error message
                  alert('Wrong name or email');
                } else {
                  // Other error, show a generic error message
                  alert('An error occurred. Please try again later.');
                }
              });
        }
      };


      const handleShowAll = () => {
        // Handle "Show all user" button click
        showusers2({})
          .then((res) => {
            if (res.data.length === 0) {
              // No users found in the database
              alert('No users found in the database');
            } else {
              // Users found, update the state to display in the table
              setUsers(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
            alert('An error occurred. Please try again later.');
          });
      };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Welcome- Home page</h2>
            <h3>Show users:</h3>
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
                <button type='Submit' className='btn btn-success w-100 rounded-0'>Show user</button>
                <button type='SubmitAll' onClick={handleShowAll} className='btn btn-success w-100 rounded-0'>Show all user</button>
                <Link to="/home" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Add users page</Link>
                <Link to='/changepass' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Change password</Link>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log out</Link>
            </form>
        
              <div className='users_to_show' style={{ maxHeight: '170px', overflowY: 'auto' }}>
          {users.length > 0 && (
            <table className='table'>
              <thead>
              <tr><th>Name</th><th>Email</th></tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>


        </div>
  
    </div>
  )
};

export default ShowUsers;
