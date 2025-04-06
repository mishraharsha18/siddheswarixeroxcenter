import React from 'react'
import notFound from '../../assets/notFound.svg'

function NotFoundPage() {
  return (
    <div className='w-80% p-8'>
        <h1 className='text-xl text-sky-400'>Opps!! Page Not Found</h1>
        <img className='w-40%' src={notFound} alt="" />
    </div>
  )
}

export default NotFoundPage