import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>
  )
}

export default LoadingSpinner