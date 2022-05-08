import {combineReducers, legacy_createStore} from "redux";
import {TodoListsReducer} from "../reducers/todoListsReducer";
import {TasksReducer} from "../reducers/tasksReducer";


const rootReducer = combineReducers({
    todolists: TodoListsReducer,
    tasks: TasksReducer,
})

export const store = legacy_createStore(rootReducer)

export type RootReducerType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store