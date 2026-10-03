import React from 'react'

const ShoeIcon = ({size = 24, className = ""}) => {
  return (
    <div>
         <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* shoe body */}
    <path d="M2 16v-3c0-1 .6-1.6 1.6-1.9L7 10l1.5 2c.6.8 1.5 1.2 2.5 1.2h5.5c2.2 0 4.5 1.3 4.5 3.3V16" />
    {/* sole */}
    <path d="M2 16h20v2H2z" />
    {/* laces */}
    <path d="M9.5 10.8l1-1.3M12 12.2l1-1.3" />
  </svg>
      
    </div>
  )
}

export default ShoeIcon
