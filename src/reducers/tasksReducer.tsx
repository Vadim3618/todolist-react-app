import React from 'react';
import {TaskObjectType, TaskPriorities, TaskStatuses, TaskType} from "../App";
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType} from "./todoListsReducer";

type ActionType = addTaskActionType | removeTaskActionType
	| changeTaskStatusActionType | changeTaskTitleActionType |
	removeTodoListACType | addTodoListACType

export const todoListID1 = v1()
export const todoListID2 = v1()

// let initState: TaskObjectType = {
//     [todoListID1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ],
//     [todoListID2]: [
//         {id: v1(), title: "apartment", isDone: true},
//         {id: v1(), title: "car", isDone: true},
//         {id: v1(), title: "yacht", isDone: false},
//         {id: v1(), title: "airplane", isDone: false},
//     ]
// };
let initState: TaskObjectType = {}
export const TasksReducer = (state = initState, action: ActionType):
	TaskObjectType => {
	switch (action.type) {
		case "REMOVE-TASK":
			return {
				...state, [action.tlId]: state[action.tlId]
					.filter(t => t.id !== action.tId)
			}
		case "ADD-TASK":
			const newTask: TaskType = {
				id: v1(),
				title: action.title,
				description: '',
				status: TaskStatuses.New,
				priority: TaskPriorities.Low,
				startDate: '',
				deadline: '',
				todoListId: action.tlId,
				order: 0,
				addedDate: '',
			}
			return {...state, [action.tlId]: [newTask, ...state[action.tlId]]}
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
export const addTaskAC = (tlId: string, title: string) => {
	return {
		type: "ADD-TASK", tlId, title
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


