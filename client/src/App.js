import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Navigate to="/posts" replace />}/>
          <Route exact path='/posts' element={<Home />}/>
          <Route exact path='/posts/search' element={<Home />}/>
          <Route exact path='/posts/:id' element={<PostDetails />}/>
          <Route exact path='/auth' element={!user ? <Auth /> : <Navigate to="/posts" replace />}/>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;