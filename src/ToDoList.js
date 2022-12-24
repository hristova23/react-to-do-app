import React from 'react'
import Task from './Task'

export default function ToDoList({tasks, toggleTask}) {
  return (
    tasks?.map(task => {
        return <Task key={task.id} task={task} toggleTask={toggleTask}/>
    })
  )
}
