import React from 'react'

export default function Task({task}) {
  return (
    <div>
        {task.name} - {String(task.isCompleted)}
    </div>
  )
}
