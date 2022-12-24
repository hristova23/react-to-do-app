import React from 'react'
import Task from './Task'

export default function ToDoList({tasks, toggleTask, deleteTask, filter}) {
    return (
      tasks?.filter(task => filter==="Completed" ?  task.isCompleted 
      : filter==="Incompleted" ? !task.isCompleted
      : task)

      .map(task => {
          return <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask}/>
      })
    )
}
