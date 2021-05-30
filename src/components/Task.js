import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa'

const Task = ({ task, onDelete, onCount, showList }) => {
  const date = new Date(...task.timeSinceLast).toDateString()

  return (
    <div className='task'>
      <h3>{task.name}
        <FaTimes 
          style={{color:'red', cursor:'pointer'}} 
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>count: {task.count}{' '}
        <FaPlus style={{color:'green', cursor:'pointer'}} onClick={() => onCount(task.id)}/>
      </p>
      <div>Last record: {date}
        <FaChevronDown onClick={() => showList(task.id)}/>
        {task.isListShown ? 
          task.occurrences.map((val) => 
          (<p key={val}>{new Date(...val).toDateString()}{', '}{new Date(...val).toLocaleTimeString()}</p>))
          : ('')
        }
      </div>
    </div>
  )
}

export default Task
