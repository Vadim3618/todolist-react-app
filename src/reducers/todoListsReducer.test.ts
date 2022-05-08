import {v1} from "uuid";
import {FilterValueType, TodolistsType} from "../App";
import {addTodoListAC, changeTodoListTitleAC, filterAC, removeTodoListAC, TodoListsReducer} from "./todoListsReducer";


let todoListId1: string
let todoListId2: string

let startState: TodolistsType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()


    startState = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]
})

test("add new todolist", () => {
    let newTodoListTitle = "NewTodoList"
    const endState = TodoListsReducer(startState, addTodoListAC(newTodoListTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should remove", () => {

    const endState = TodoListsReducer(startState, removeTodoListAC(todoListId1))
    console.log(endState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should change title", () => {

    let newTodoListTitle = "NewTodoList"
    const endState = TodoListsReducer(startState,
      changeTodoListTitleAC(todoListId2, "NewTodoList"))
    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todoListId2)
    expect(endState[1].title).toBe(newTodoListTitle)

})

test("correct todolist should change filter", () => {

    let newTodoListFilter: FilterValueType = "completed"

    const endState = TodoListsReducer(startState,
      filterAC(todoListId2, "completed"))
    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todoListId2)
    expect(endState[1].filter).toBe(newTodoListFilter)

})
