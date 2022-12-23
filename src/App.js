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
    console.log('reloading')
  }, [tasks]);

  function handleAddTask(){
    const name = taskNameRef.current.value
    if(name === '') return
    setTasks(prevTasks => {
      return [...prevTasks, {id: uuidv4(), name:name, isCompleted: false}]
    })
    taskNameRef.current.value = null;
  }

  return (
    <>
    Tasks:
    <ToDoList tasks={tasks}/>
    <input ref={taskNameRef} type="text" />
    <button onClick={handleAddTask}>Add Task</button>
    </>
  )
}

export default App;
