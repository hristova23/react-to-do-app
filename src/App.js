import React, {useState, useRef} from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid"

function App() {
  const [tasks, setTasks] = useState([{id:1,name:'task1',isCompleted:false}, {id:2,name:'task2',isCompleted:true}])
  const taskNameRef = useRef();

  function handleAddTask(){
    const name = taskNameRef.current.value
    
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
