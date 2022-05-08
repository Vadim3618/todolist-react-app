import React, {ChangeEvent} from 'react';
import {TaskType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
                    <Checkbox onChange={e => onChangeStatusHandler(t.id, e)}
                              checked={t.isDone} color={"info"}/>
                    <EditableSpan title={t.title} onChange={onChangeTaskTitle}
                                  isDone={t.isDone}/>
                    <IconButton>
                        <Delete fontSize={"small"}
                                onClick={() => onClickRemoveHandler(t.id)}/>
                    </IconButton>
                </li>)
          })}
      </ol>
    );
};

