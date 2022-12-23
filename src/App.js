import React, {useState} from "react";
import ToDoList from "./ToDoList";

function App() {
  const [tasks, setTasks] = useState([{id:1,name:'task1',isCompleted:false}, {id:2,name:'task2',isCompleted:true}])

  return (
    <>
    Tasks:
    <ToDoList tasks={tasks}/>
    </>
  )
}

export default App;
