import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/landing.css'

export default function Landing() {
  return (
    <div>
      <div>
        <Link to='/login' className='loginReg'>Login or Register</Link>
      </div>
      <section className="background-one">
        <h1>EXPLORE</h1>
      </section>

      <section className="background-two">
        <h1>INSPIRE</h1>
      </section>

      <section className="background-three">
        <h1>SELL AND BUY</h1>
      </section>

    </div>
  )
}
