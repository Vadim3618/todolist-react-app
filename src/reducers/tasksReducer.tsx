import React from 'react';
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType, setTodolistAC, setTodolistActionType} from "./todoListsReducer";
import {TaskObjectType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../common/types";
import {todolistsAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk, RootReducerType} from "./store";

export type TasksActionType = addTaskActionType | removeTaskActionType
	| changeTaskStatusActionType | changeTaskTitleActionType | removeTodoListACType
	| addTodoListACType | setTodolistActionType | fetchTasksActionType

export const todoListID1 = v1()
export const todoListID2 = v1()

let initState: TaskObjectType = {}
export const TasksReducer = (state = initState, action: TasksActionType):
	TaskObjectType => {
	switch (action.type) {
		case "FETCH_TASKS":
			// const stateCopy = {...state}
			// stateCopy[action.todoId] = action.tasks
			// return stateCopy
			return {...state, [action.todoId]: action.tasks}
		case "SET_TODOS":
			const stateCopy = {...state}
			action.todos.forEach(tl => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		case "REMOVE-TASK":
			return {
				...state, [action.tlId]: state[action.tlId]
					.filter(t => t.id !== action.tId)
			}
		case "ADD-TASK":
			return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
		case "CHANGE-TASK-STATUS":
			return {
				...state,
				[action.tlId]: state[action.tlId].map(t => t.id === action.tId ? {
					...t, status: action.isDone
				} : t)
			}
		case "CHANGE-TASK-TITLE":
			return {
				...state, [action.tlId]: state[action.tlId]
					.map(t => t.id === action.tId ? {...t, title: action.newTitle} : t)
			}
		case "REMOVE-TODOLIST":
			const copyState = {...state}
			delete copyState[action.tlId]
			return copyState
		case 'ADD-TODOLIST':
			return {...state, [action.tlId]: []}
		default:
			return state
	}
};

type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (tlId: string, tId: string) => {
	return {
		type: "REMOVE-TASK", tlId, tId
	} as const
}

type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
	return {
		type: "ADD-TASK", task
	} as const
}

type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (tlId: string, tId: string, isDone: TaskStatuses) => {
	return {
		type: "CHANGE-TASK-STATUS", tlId, tId, isDone
	} as const
}

type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (tlId: string, tId: string, newTitle: string) => {
	return {
		type: "CHANGE-TASK-TITLE", tlId, tId, newTitle
	} as const
}

type fetchTasksActionType = ReturnType<typeof fetchTasksAC>
const fetchTasksAC = (todoId: string, tasks: TaskType[]) => {
	return {type: 'FETCH_TASKS', todoId, tasks} as const
}

//thunks
export const fetchTasksTC = (todoId: string): AppThunk => (dispatch) => {
	todolistsAPI.getTasks(todoId)
		.then(res => {
			const tasks = res.data.items
			dispatch(fetchTasksAC(todoId, tasks))
		})
}

export const removeTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
	todolistsAPI.deleteTask(todoId, taskId)
		.then(res => {
			dispatch(removeTaskAC(todoId, taskId))
		})
}

export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
	todolistsAPI.createTask(todoId, title)
		.then(res => {
			const newTask = res.data.data.item
			dispatch(addTaskAC(newTask))
		})
}

export const updateTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses): AppThunk => (dispatch, getState: () => RootReducerType) => {
	const state = getState()
	const allAppTasks = state.tasks//все таски
	const tasksForCurrentTodo = allAppTasks[todoId]//массив конкретных тасок в чьем тудулисте меняем статус
	const changedTask = tasksForCurrentTodo.find(t => t.id === taskId)//нашли конкретную таску

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
				dispatch(changeTaskStatusAC(todoId, taskId, status))
			})
	}
}




