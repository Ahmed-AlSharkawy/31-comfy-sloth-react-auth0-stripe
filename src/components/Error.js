import React from 'react'
const Error = ({ error }) => {
  return (
    <div
      className='section section-center text-center'
      style={{ fontSize: '2rem', color: 'red', padding: '2rem' }}
    >
      {error}
    </div>
  )
}

export default Error
