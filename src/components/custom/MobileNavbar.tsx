'use client'
import React from 'react'
import { FaBars } from 'react-icons/fa6'

const MobileNavbar = () => {
  return (
   <>
    <FaBars onClick={()=>alert('mobile nav click')} className='md:hidden'/>
   </>
  )
}

export default MobileNavbar