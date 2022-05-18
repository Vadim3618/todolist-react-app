import React, {ChangeEvent, memo, useCallback} from 'react';
import {TaskType, TodolistsType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

type TasksListPropsType = {
    tlId: string
    tasks: Array<TaskType>
    tasksForTodoList: Array<TaskType>
    removeTask: (tlId: string, id: string) => void
    changeStatus: (tlId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (tlId: string, id: string, newValue: string) => void
}

export const TasksList: React.FC<TasksListPropsType> = memo((props) => {


    return (

      <ol>
          {props.tasksForTodoList.map(t => <Task task={t}
                                                 removeTask={props.removeTask}
                                                 changeTaskTitle={props.changeTaskTitle}
                                                 changeStatus={props.changeStatus}
                                                 tlId={props.tlId}
                                                 key={t.id}/>)}
      </ol>
    );
})

