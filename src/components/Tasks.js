import Task from './Task'

const Tasks = ({ tasks, onDelete, onCount, showList }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onCount={onCount} showList={showList}/>
      ))}
    </>
  )
}

export default Tasks
