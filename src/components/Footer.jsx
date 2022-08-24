import React from 'react'
import {FaExclamationCircle} from 'react-icons/fa'

const Footer = () => {
  return (
    <>
        <div className='fixed-bottom w-100 bg-light text-center mb-0 mt-5 border-top'>
            <p className='text-danger p-3 mb-0'><FaExclamationCircle /> Disclaimer: None of the ads on this website are real.</p>
        </div>
    </>
  )
}

export default Footer