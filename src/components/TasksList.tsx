import React, {memo} from 'react';
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../common/types";

type TasksListPropsType = {
	tlId: string
	tasks: Array<TaskType>
	tasksForTodoList: Array<TaskType>
	removeTask: (tlId: string, id: string) => void
	changeStatus: (tlId: string, id: string, isDone: TaskStatuses) => void
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

