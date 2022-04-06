import React, {ChangeEvent} from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";

type TasksListPropsType = {
    tlId: string
    tasks: Array<TaskType>
    removeTask: (tlId: string, id: string) => void
    changeStatus: (tlId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (tlId: string, id: string, newValue: string) => void
}

export const TasksList: React.FC<TasksListPropsType> = (props) => {

    return (
      <ol>
          {props.tasks.map(t => {
              const onClickRemoveHandler = (id: string) => {
                  props.removeTask(props.tlId, id)
              }
              const onChangeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
                  props.changeStatus(props.tlId, id, e.currentTarget.checked)
              }
              const onChangeTaskTitle = (newValue: string) => {
                  props.changeTaskTitle(props.tlId, t.id, newValue)
              }

              return (
                <li key={t.id}>
                    <input type={"checkbox"}
                           onChange={e => onChangeStatusHandler(t.id, e)}
                           checked={t.isDone}/>
                    {/*<span className={t.isDone ? 'is-done' : ''}>{t.title}</span>*/}
                    <EditableSpan title={t.title} onChange={onChangeTaskTitle}/>
                    <Button name={'x'} callback={() => onClickRemoveHandler(t.id)}/>
                    {/*<button onClick={() => onClickRemoveHandler(t.id)}>x</button>*/}
                </li>)
          })}
      </ol>
    );
};

