import React, {ChangeEvent} from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";

type TasksListPropsType = {
    tlId: string
    tasks: Array<TaskType>
    removeTask: (tlId: string, id: string) => void
    changeStatus: (tlId: string, id: string, isDone: boolean) => void
}

export const TasksList: React.FC<TasksListPropsType> = (props) => {

    const onClickRemoveHandler = (id: string) => {
        props.removeTask(props.tlId, id)
    }
    const onChangeHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.tlId, id, e.currentTarget.checked)
    }

    return (
      <ol>
          {props.tasks.map(t =>
            <li key={t.id}>
                <input type={"checkbox"}
                       onChange={(e) => onChangeHandler(t.id, e)}
                       checked={t.isDone}/>
                <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
                <Button name={'x'} callback={() => onClickRemoveHandler(t.id)}/>
                {/*<button onClick={() => onClickRemoveHandler(t.id)}>x</button>*/}
            </li>)}
      </ol>
    );
};