import React, {useState, useRef, useEffect} from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckSquare, FaCalendarAlt, FaSortAmountDownAlt } from 'react-icons/fa';
import { VscClearAll } from 'react-icons/vsc';


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
      <section className="vh-100">
          <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                  <div className="card" id="list1" style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
                  <div className="card-body py-4 px-4 px-md-5">

                      <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                      <FaCheckSquare />
                      <u>My Todo-s</u>
                      </p>

                      <div className="pb-2">
                      <div className="card">
                          <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                              <input ref={taskNameRef} type="text" className="form-control form-control-lg"
                              placeholder="Add new..." />
                              <a href="#!" data-mdb-toggle="tooltip" title="Set due date">
                                <FaCalendarAlt size={28} /></a>
                              <div>
                              <button onClick={handleAddTask} className="btn btn-primary">Add</button>
                              </div>
                          </div>
                          </div>
                      </div>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                        <p className="small mb-0 me-2 text-muted">Filter</p>
                        <select className="select">
                            <option value="1">All</option>
                            <option value="2">Completed</option>
                            <option value="3">Incompleted</option>
                        </select>
                        <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                        <select className="select">
                            <option value="1">Recent</option>
                            <option value="2">Older</option>
                        </select>
                        <a href="#!" style={{color:"#23af89"}} data-mdb-toggle="tooltip" title="Ascending">
                          <FaSortAmountDownAlt />
                          <VscClearAll size={20} color={"red"} onClick={handleClearTasks} />
                        </a>
                        </div>

                      <ToDoList tasks={tasks} toggleTask={toggleTask}/>

                      <div>{tasks.filter(task => !task.isCompleted).length} tasks left.</div>
                  </div>
                  </div>
              </div>
              </div>
          </div>
      </section>
    </>
  )
}

export default App;
