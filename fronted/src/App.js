// fronted/src/App
import React from 'react';
import Login from './Login';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './Signup'
import Resetpassword from './resetpassword'
import Continureset from './Continureset';
import HomePage from './HomePage';
import Changepass from './Changepass';
import ShowUsers from './ShowUsers';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/resetpassword' element={<Resetpassword />}></Route>
        <Route path='/continureset' element={<Continureset />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/changepass' element={<Changepass />}></Route>
        <Route path='/showusers' element={<ShowUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
