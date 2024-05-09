import React from 'react'
import "./loader.css"
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 height_full">
    <div className="loader"></div>    
    <p>Loading...</p>
    </div>
  )
}

export default Loader;