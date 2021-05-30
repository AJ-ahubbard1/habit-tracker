import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddHabit from './components/AddHabit'

function App() {
  const server = '192.168.1.7:5001'
  const [tasks, setTasks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const toggleAddForm = () => setShowAddForm(!showAddForm)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch(`http://${server}/tasks`)
    const data = await res.json()
    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://${server}/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const addTask = async (task) => {
    const dateStr = `${task.date}T${task.time}`
    const date = new Date(dateStr);
    const vals = [date.getFullYear(),date.getMonth(),date.getDate(),
    date.getHours(),date.getMinutes(),0]
    const list = []
    list.push(vals)
    const newTask = {
      id:tasks.length + 1,
      name: task.name,
      count: 1,
      timeSinceLast: vals,
      occurrences: list,
      isListShown: false
    } 
    const res = await fetch(
      `http://${server}/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
    const data = await res.json()
    setTasks([...tasks, data])
    toggleAddForm()
  }

  const deleteTask = async (id) => {
    await fetch(`http://${server}/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const addToCount = async (id) => {
    const date = new Date();
    const values = [date.getFullYear(),date.getMonth(),date.getDate(),
      date.getHours(),date.getMinutes(),date.getSeconds()]
    const taskToUpdate = await fetchTask(id)
    const list = taskToUpdate.occurrences
    list.push(values)
    const updatedTask = { ...taskToUpdate, count: taskToUpdate.count + 1, timeSinceLast: values, occurrences: list}
    const res = await fetch(
      `http://${server}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })

    const data = await res.json()
    
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, count:data.count, timeSinceLast: data.timeSinceLast, occurrences:data.occurrences} : task 
    ))
  }
  const showList = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? 
        {...task, isListShown: !task.isListShown
        } : task 
      )
    )
  }
    
  return (
    <div className="container">
      <Header showAddForm={toggleAddForm} showAdd={showAddForm}/>
      {showAddForm && <AddHabit onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onCount={addToCount} showList={showList}/>
      ) : (
        <p>No Habits... add a new one!</p> 
      )}
    </div>
  );
}

export default App;
