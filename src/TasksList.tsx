import React from 'react';
import {TaskType} from "./App";
import {Button} from "./Button";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}

export const TasksList: React.FC<TasksListPropsType> = (props) => {

    const onClickRemoveHandler = (id: string) => {
        props.removeTask(id)
    }
    return (
      <ol>
          {props.tasks.map(t =>
            <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name={'x'} callback={()=>onClickRemoveHandler(t.id)}/>
                {/*<button onClick={() => onClickRemoveHandler(t.id)}>x</button>*/}
            </li>)}
      </ol>
    );
};