import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListsReducer} from "./todoListsReducer";
import {TasksReducer} from "./tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
	todolists: TodoListsReducer,
	tasks: TasksReducer,
	app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store