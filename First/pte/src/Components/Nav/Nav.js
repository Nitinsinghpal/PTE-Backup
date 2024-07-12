import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
function Nav() {
  return (
    <div className='nav-main'>
      <div className='nav-main-content'>
        <ul className='links-Parent'>
          <li><Link to='/reading'>Reading</Link></li>
          <li><Link to='/writing'>Writing</Link></li>
          <li><Link to='/listening'>Listening</Link></li>
          <li><Link to='/speaking'>Speaking</Link></li>

        </ul>
      </div>
    </div>
  )
}

export default Nav