import React, {useState, useRef, useEffect} from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckSquare, FaSortAmountDownAlt } from 'react-icons/fa';
import { VscClearAll } from 'react-icons/vsc';


function App() {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem('tasks')
    return localData ? JSON.parse(localData) : []
  })
  const [filter, setFilter] = useState();

  const taskNameRef = useRef();
  const dateRef = useRef();
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  function toggleTask(id){
    const tasksTemp = [...tasks]
    const task = tasksTemp.find(task => task.id === id)
    task.isCompleted = !task.isCompleted;
    setTasks(tasksTemp)
  }

  function deleteTask(id){
    const tasksTemp = tasks.filter(task => task.id !== id)
    setTasks(tasksTemp)
  }

  function handleAddTask(){
    const name = taskNameRef.current.value
    if(name === '') return
    setTasks(prevTasks => {
      return [...prevTasks, {id: uuidv4(), name:name, date:dateRef.current.value, isCompleted: false}]
    })
    taskNameRef.current.value = null;
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
                                <input ref={dateRef} type="date" value={new Date().toISOString().slice(0, 10)} className="form-control form-control-lg" /></a>
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
                        <select onChange={(e) => setFilter(e.target.value)} className="select">
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Incompleted">Incompleted</option>
                        </select>
                        <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                        <select className="select">
                            <option value="Recent">Recent</option>
                            <option value="Older">Older</option>
                        </select>
                        <a href="#!" style={{color:"#23af89"}} data-mdb-toggle="tooltip" title="Sort">
                          <FaSortAmountDownAlt />
                        </a>
                        <a href="#!" style={{color:"#23af89"}} data-mdb-toggle="tooltip" title="Clear All">
                          <VscClearAll size={20} color={"red"} onClick={() => setTasks([])} />
                        </a>
                        </div>

                      <ToDoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} filter={filter}/>

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
