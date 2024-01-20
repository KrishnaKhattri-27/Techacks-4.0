import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Dashboard/Hero'
import "./style.css"

const Dashboard = () => {
  return (
    <div className='homebg'>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default Dashboard
