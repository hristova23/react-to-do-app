import React, {useState, useRef, useEffect} from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid"

function App() {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem('tasks')
    return localData ? JSON.parse(localData) : []
  })
  const taskNameRef = useRef();
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  function toggleTask(id){
    const tasksTemp = [...tasks]
    const task = tasksTemp.find(task => task.id === id)
    task.isCompleted = !task.isCompleted;
    setTasks(tasksTemp)
  }

  function handleAddTask(){
    const name = taskNameRef.current.value
    if(name === '') return
    setTasks(prevTasks => {
      return [...prevTasks, {id: uuidv4(), name:name, isCompleted: false}]
    })
    taskNameRef.current.value = null;
  }

  function handleClearTasks(){
    const incompletedTasks = tasks.filter(task => !task.isCompleted);
    setTasks(incompletedTasks)
  }

  return (
    <>
    Tasks:
    <ToDoList tasks={tasks} toggleTask={toggleTask}/>
    <input ref={taskNameRef} type="text" />
    <button onClick={handleAddTask}>Add Task</button>
    <button onClick={handleClearTasks}>Clear</button>
    <div>{tasks.filter(task => !task.isCompleted).length} tasks left.</div>
    </>
  )
}

export default App;
