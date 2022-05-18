import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../App";

type TaskPropsType = {
    tlId: string
    task: TaskType
    removeTask: (tlId: string, tId: string) => void
    changeTaskTitle: (tlId: string, tId: string, newValue: string) => void
    changeStatus: (tlId: string, tId: string, isDone: boolean) => void

}

export const Task = memo((props: TaskPropsType) => {

    const onClickRemoveHandler = () => {
        props.removeTask(props.tlId, props.task.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.tlId, props.task.id, e.currentTarget.checked)
    }

    const onChangeTaskTitle = useCallback((newValue: string) => {
        props.changeTaskTitle(props.tlId, props.task.id, newValue)
    }, [props.changeTaskTitle, props.tlId, props.task.id])

    return (
      <li key={props.task.id}>
          <Checkbox onChange={e => onChangeHandler(e)}
                    checked={props.task.isDone} color={"info"}/>
          <EditableSpan title={props.task.title} onChange={onChangeTaskTitle}
                        isDone={props.task.isDone}/>
          <IconButton onClick={() => onClickRemoveHandler()}>
              <Delete fontSize={"small"}
              />
          </IconButton>
      </li>
    );
})
