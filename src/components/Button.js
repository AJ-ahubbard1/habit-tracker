import React from 'react'

const Button = ({ color, text, onClick }) => {
  
  return (
    <div>
      <button onClick={onClick} className='btn' style={{backgroundColor: color}} >{text}</button>
    </div>
  )
}

const logClick = () => {
  console.log('click')
}

Button.defaultProps = {
  color: 'steelblue',
  onClick: logClick,
}

export default Button
