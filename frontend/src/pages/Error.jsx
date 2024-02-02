import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h1>NO PAGE FOUND</h1>
      <button onClick={()=>navigate("/")}>BACK TO HOME PAGE</button>
    </div>
  )
}

export default Error
