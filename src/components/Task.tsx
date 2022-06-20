import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../common/types";
import {useAppSelector} from "../common/hooks";

type TaskPropsType = {
	tlId: string
	task: TaskType
	removeTask: (tlId: string, tId: string) => void
	changeTaskTitle: (tlId: string, tId: string, newValue: string) => void
	changeStatus: (tlId: string, tId: string, status: TaskStatuses) => void

}

export const Task = memo((props: TaskPropsType) => {

	const entityStatus = useAppSelector(state => state.tasks[props.tlId])
		.find(t => t.id === props.task.id)!.entityStatus

	const onClickRemoveHandler = () => {
		props.removeTask(props.tlId, props.task.id)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.changeStatus(props.tlId, props.task.id,
			e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
	}

	const onChangeTaskTitle = useCallback((newValue: string) => {
		props.changeTaskTitle(props.tlId, props.task.id, newValue)
	}, [props.changeTaskTitle, props.tlId, props.task.id])

	return (
		<li key={props.task.id}>
			<Checkbox onChange={onChangeHandler}
			          checked={props.task.status === TaskStatuses.Completed} color={"info"}/>
			<EditableSpan title={props.task.title} onChange={onChangeTaskTitle}
			              isDone={props.task.status}/>
			<IconButton disabled={entityStatus === 'loading'} onClick={() => onClickRemoveHandler()}>
				<Delete fontSize={"small"}
				/>
			</IconButton>
		</li>
	);
})
