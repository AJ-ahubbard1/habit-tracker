import { useState } from 'react'

const AddHabit = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if(!name) {
      alert('Please add a Habit')
      return
    }
    onAdd({name, date, time })

    setName('')
    setDate('')
    setTime('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Habit</label>
        <input type='text' placeholder='Add Habit' 
         value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Date</label>
        <input type='date'
        value={date} onChange={(e) => setDate(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Time</label>
        <input type='time'
        value={time} onChange={(e) => setTime(e.target.value)}/>
      </div>
      <input type='submit' value='Save Habit' className='btn btn-block'/>
    </form>
  )
}

export default AddHabit
