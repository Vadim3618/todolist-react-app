import React, {memo, useCallback, useEffect} from 'react';
import TodoListHeader from "./TodoListHeader";
import {TasksList} from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import {Button, ButtonGroup} from "@mui/material";
import {FilterValueType, RequestStatusType, TaskStatuses, TaskType} from "../common/types";
import {fetchTasksTC} from "../reducers/tasksReducer";
import {useAppDispatch} from "../common/hooks";

type TodoListPropsType = {
	tlId: string
	title: string
	filter: FilterValueType
	tasks: Array<TaskType>
	entityStatus: RequestStatusType
	removeTask: (tlId: string, id: string) => void
	addTask: (tlId: string, title: string) => void
	removeTodoList: (tlId: string) => void
	changeFilter: (tlId: string, filter: FilterValueType) => void
	changeStatus: (tlId: string, id: string, isDone: TaskStatuses) => void
	changeTaskTitle: (tlId: string, id: string, newValue: string) => void
	changeTodoListTitle: (tlId: string, newValue: string) => void
}

const TodoList = memo((props: TodoListPropsType) => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTasksTC(props.tlId))
	}, [])

	const changeFilterHandler = useCallback((filter: FilterValueType) => {
		props.changeFilter(props.tlId, filter)
	}, [props.changeFilter, props.tlId])

	const addTask = useCallback((title: string) => {
		props.addTask(props.tlId, title)
	}, [props.addTask, props.tlId])

	const onClickRemoveHandler = useCallback((tlId: string) => {
		props.removeTodoList(tlId)
	}, [props.removeTodoList])

	let tasksForTodoList = props.tasks//todoListID1 or todoListID2
	if (props.filter === 'active') {
		tasksForTodoList = tasksForTodoList.filter(t => !t.status)
	}
	if (props.filter === 'completed') {
		tasksForTodoList = tasksForTodoList.filter(t => t.status)
	}

	return (
		<div>
			<TodoListHeader entityStatus={props.entityStatus}
			                changeTodoListTitle={props.changeTodoListTitle}
			                tlId={props.tlId} title={props.title}
			                callback={() => onClickRemoveHandler(props.tlId)}
			/>
			<AddItemForm entityStatus={props.entityStatus}
			             title={'Add New Task'} addItem={addTask}/>
			<TasksList tasks={props.tasks}
			           tasksForTodoList={tasksForTodoList}
			           removeTask={props.removeTask}
			           changeStatus={props.changeStatus}
			           tlId={props.tlId}
			           changeTaskTitle={props.changeTaskTitle}
			/>
			<div>
				<ButtonGroup variant="contained" aria-label="outlined primary button group">
					<Button style={{width: '100px'}} color={"info"}
					        variant={props.filter === 'all' ? 'text' : 'contained'}
					        onClick={() => changeFilterHandler('all')}>All</Button>
					<Button style={{width: '100px'}} color={"info"}
					        variant={props.filter === 'active' ? 'text' : 'contained'}
					        onClick={() => changeFilterHandler('active')}>Active</Button>
					<Button style={{width: '100px'}} color={"info"}
					        variant={props.filter === 'completed' ? 'text' : 'contained'}
					        onClick={() => changeFilterHandler('completed')}>Finished</Button>
				</ButtonGroup>
			</div>
		</div>
	);
})

export default TodoList;





