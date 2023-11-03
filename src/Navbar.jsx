import React from 'react';
import {Link} from 'react-router-dom';
function Navbar(){
  return(
    <div className='nav'>
      <div className='logo'>
      <h2>Product Name</h2>
      </div>
      <div className='nav-items'> 
        <ul>
        <li>Home</li>
          <li>AboutUs</li>
          <li>ContactUs</li>
        </ul>
      </div>
    </div>
  )
}
export default Navbar;