import React from 'react';
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType, setTodolistActionType} from "./todoListsReducer";
import {AppThunk, RootReducerType, TaskObjectType, TaskStatuses, TaskType, UpdateTaskModelType} from "../common/types";
import {todolistsAPI} from "../api/todolist-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";

export type TasksActionType = addTaskActionType | removeTaskActionType
	| changeTaskStatusActionType | changeTaskTitleActionType
	| removeTodoListACType
	| addTodoListACType | setTodolistActionType | fetchTasksActionType

export const todoListID1 = v1()
export const todoListID2 = v1()

let initState: TaskObjectType = {}
export const TasksReducer = (state = initState, action: TasksActionType):
	TaskObjectType => {
	switch (action.type) {
		case "TASK/FETCH_TASKS":
			return {
				...state, [action.todoId]: action.tasks
					.map(t => ({...t, entityStatus: 'idle'}))
			}
		case "TODO/SET_TODOS":
			const stateCopy = {...state}
			action.todos.forEach(tl => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		case "TASK/REMOVE_TASK":
			return {
				...state, [action.tlId]: state[action.tlId]
					.filter(t => t.id !== action.tId)
			}
		case "TASK/ADD_TASK":
			return {
				...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
					.map(t => ({...t, entityStatus: 'idle'}))
			}
		case "TASK/CHANGE_TASK_STATUS":
			return {
				...state,
				[action.tlId]: state[action.tlId].map(t => t.id === action.tId ? {
					...t, status: action.isDone
				} : t)
			}
		case "TASK/CHANGE_TASK_TITLE":
			return {
				...state, [action.tlId]: state[action.tlId]
					.map(t => t.id === action.tId ? {...t, title: action.newTitle} : t)
			}
		case "TODO/REMOVE_TODOLIST":
			const copyState = {...state}
			delete copyState[action.tlId]
			return copyState
		case 'TODO/ADD_TODOLIST':
			return {...state, [action.todolist.id]: []}
		default:
			return state
	}
};

//action creators
type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (tlId: string, tId: string) => {
	return {
		type: "TASK/REMOVE_TASK", tlId, tId
	} as const
}

type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
	return {
		type: "TASK/ADD_TASK", task
	} as const
}

type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (tlId: string, tId: string, isDone: TaskStatuses) => {
	return {
		type: "TASK/CHANGE_TASK_STATUS", tlId, tId, isDone
	} as const
}

type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (tlId: string, tId: string, newTitle: string) => {
	return {
		type: "TASK/CHANGE_TASK_TITLE", tlId, tId, newTitle
	} as const
}

type fetchTasksActionType = ReturnType<typeof fetchTasksAC>
const fetchTasksAC = (todoId: string, tasks: TaskType[]) => {
	return {type: 'TASK/FETCH_TASKS', todoId, tasks} as const
}
//для блокировки кнопки удаления таски
// type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
// const changeTodolistEntityStatusAC = (todoId: string, taskId: string, entityStatus: RequestStatusType) => {
// 	return {type: 'TASK/CHANGE_TASK_ENTITY_STATUS', todoId, taskId, entityStatus} as const
// }

//thunks
export const fetchTasksTC = (todoId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.getTasks(todoId)
		.then(res => {
			dispatch(fetchTasksAC(todoId, res.data.items))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}

export const removeTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.deleteTask(todoId, taskId)
		.then(res => {
			res.data.resultCode === 0
				? dispatch(removeTaskAC(todoId, taskId))
				: dispatch(setAppErrorAC(res.data.messages[0]))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}

export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.createTask(todoId, title)
		.then(res => {
			res.data.resultCode === 0
				? dispatch(addTaskAC(res.data.data.item))
				: dispatch(setAppErrorAC(res.data.messages[0]))
			dispatch(setAppStatusAC('idle'))
		})
		.catch((err: AxiosError) => {
			dispatch(setAppErrorAC(err.message))
			dispatch(setAppStatusAC('idle'))
		})
}

export const updateTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses): AppThunk => (dispatch, getState: () => RootReducerType) => {
	dispatch(setAppStatusAC('loading'))
	const changedTask = getState().tasks[todoId]
		.find(t => t.id === taskId)//нашли конкретную таску из всего стэйта, далее из массива тасок по tlId

	if (changedTask) {
		const model: UpdateTaskModelType = {
			title: changedTask.title,
			status,
			description: changedTask.description,
			priority: changedTask.priority,
			startDate: changedTask.startDate,
			deadline: changedTask.deadline
		}
		todolistsAPI.updateTask(todoId, taskId, model)
			.then(res => {
				res.data.resultCode === 0
					? dispatch(changeTaskStatusAC(todoId, taskId, status))
					: dispatch(setAppErrorAC(res.data.messages[0]))
				dispatch(setAppStatusAC('idle'))
			})
			.catch((err: AxiosError) => {
				dispatch(setAppErrorAC(err.message))
				dispatch(setAppStatusAC('idle'))
			})
	}
}
export const updateTaskTitleTC = (todoId: string, taskId: string, title: string): AppThunk => (dispatch, getState: () => RootReducerType) => {
	const changedTask = getState().tasks[todoId]
		.find(t => t.id === taskId)//нашли конкретную таску из всего стэйта, далее из массива тасок по tlId

	if (changedTask) {
		const model: UpdateTaskModelType = {
			title,
			status: changedTask.status,
			description: changedTask.description,
			priority: changedTask.priority,
			startDate: changedTask.startDate,
			deadline: changedTask.deadline
		}
		dispatch(setAppStatusAC('loading'))
		todolistsAPI.updateTask(todoId, taskId, model)
			.then(res => {
				res.data.resultCode === 0
					? dispatch(changeTaskTitleAC(todoId, taskId, title))
					: dispatch(setAppErrorAC(res.data.messages[0]))
				dispatch(setAppStatusAC('idle'))
			})
			.catch((err: AxiosError) => {
				dispatch(setAppErrorAC(err.message))
				dispatch(setAppStatusAC('idle'))
			})
	}
}








