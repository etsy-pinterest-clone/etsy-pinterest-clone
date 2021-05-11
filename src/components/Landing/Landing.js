import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './images/logo.png'
import '../../styles/landing.css'

export default function Landing() {
  return (
    <div className='landing-Pg'>
      
        {/* <button><Link to='/login' className='loginReg'>Login or Register</Link></button> */}
      
      <section className="background-one">
        <img className='logo' src={Logo} alt='Logo'/>
      </section>

      <section className='landing-pgtext'>
        <h1 className='landing-H1'>Explore</h1><br/>
        <p> Find unique gifts for friends and loved ones. Get ideas for your next DIY project, and save them to you collections. </p>
      </section>

      <section className="background-two">
      </section>

      <section className='landing-pgtext'>
      <h1 className='landing-H1'>Inspire</h1><br/>
      <p>These DIY projects will inspire you to get crafty. Sign up and browse for ideas.</p>
      </section>

      <section className="background-three">
      </section>

      <section className='landing-pgtext'>
      <h1 className='landing-H1'>Sell</h1><br/>
      <p>Everything You Need to Start Selling Online. Join The Creative Marketplace Today!</p>
      </section>

      <section className="background-four">
      </section>

    </div>
  )
}
