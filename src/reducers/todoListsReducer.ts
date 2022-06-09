import {v1} from "uuid";
import {FilterValueType, TodoListDomainType} from "../App";

export type ActionType = removeTodoListACType
  | addTodoListACType
  | changeTodoListTitleACType
  | filterACType

// let initState: TodolistsType[] = [
//     {id: todoListID1, title: 'What to learn', filter: 'all'},
//     {id: todoListID2, title: 'What to buy', filter: 'all'},
// ]
let initState: TodoListDomainType[] = []
export const TodoListsReducer = (state = initState, action: ActionType):
  TodoListDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.tlId)
        }
        case "ADD-TODOLIST": {
            let NewTodolist = {
                id: action.tlId,
                filter: 'all' as FilterValueType,
                title: action.title,
	            addedDate:'',
	            order: 0
            }
            return [NewTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.tlId
              ? {...tl, title: action.title}
              : tl)
        }
        case "FILTER": {
            return state.map(el => el.id === action.tlId
              ? {...el, filter: action.filter}
              : el)
        }
        default:
            return state
    }
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST", tlId: v1(), title
    } as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (tlId: string) => {
    return {
        type: "REMOVE-TODOLIST", tlId
    } as const

}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (tlId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE", tlId, title
    } as const
}

type filterACType = ReturnType<typeof filterAC>
export const filterAC = (tlId: string, filter: FilterValueType) => {
    return {
        type: "FILTER", filter, tlId
    } as const
}
