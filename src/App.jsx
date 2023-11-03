import React, { useState } from 'react'
import Navbar from './Navbar'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Form from './Form'
import PaymentInfo from './PaymentInfo'
export default function App() {
  return(
    
   <div>
     <Navbar/>
    <Router>
      
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/details' element={<PaymentInfo/>}/>
    </Routes>
      </Router>
     </div>
      
  )  
}
