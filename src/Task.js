import React from 'react'
import { FaTrashAlt, FaClock } from 'react-icons/fa';

export default function Task({task, toggleTask, deleteTask}) {

  function handleTaskClick(){
    toggleTask(task.id)
  }

  function handleDeleteTask(){
    deleteTask(task.id)
  }

  return (
    <>
      <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
        <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
            <div className="form-check">
            <input className="form-check-input me-0" type="checkbox"
                aria-label="..." checked={task.isCompleted} onChange={handleTaskClick} />
            </div>
        </li>
        <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
            <p className="lead fw-normal mb-0">{task.name}</p>
        </li>
        <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
            <div className="d-flex flex-row justify-content-end mb-1">
            <a href="#!" className="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><FaTrashAlt onClick={handleDeleteTask}/>
            </a>
            </div>
            <div className="text-end text-muted">
            <a href="#!" className="text-muted">
                <p className="small mb-0"><FaClock />Due {task.date}</p>
            </a>
            </div>
        </li>
      </ul>
    </>
  )
}
