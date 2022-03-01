import React from 'react';
import {TaskType} from "./App";

type TasksListPropsType = {
  tasks: Array<TaskType>
}

export const TasksList = (props: TasksListPropsType) => {
  return (
    <div>
      <ul>
        <li>
          <input type="checkbox" checked={props.tasks[0].isDone}/>
          <span>{props.tasks[0].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.tasks[1].isDone}/>
          <span>{props.tasks[1].title}</span>
        </li>
        <li>
          <input type="checkbox" checked={props.tasks[2].isDone}/>
          <span>{props.tasks[2].title}</span>
        </li>
      </ul>
    </div>
  )
}