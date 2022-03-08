import React from 'react';
import {TaskType} from "./App";

type TasksListPropsType = {
  tasks: Array<TaskType>
  removeTask: (id: number) => void
}

export const TasksList: React.FC<TasksListPropsType> = (props) => {
  return (
    <ul>
      {props.tasks.map(t =>
        <li key={t.id}>
          <input type={"checkbox"} checked={t.isDone}/>
          <span>{t.title}</span>
          <button onClick={() => props.removeTask(t.id)}>x</button>
        </li>)}
    </ul>
  );
};