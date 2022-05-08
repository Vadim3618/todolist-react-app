import {TaskObjectType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoListsReducer";

let startState: TaskObjectType

beforeEach(()=>{
    startState = {
        'todoListID1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        'todoListID2': [
            {id: v1(), title: "apartment", isDone: true},
            {id: 'id-2task-2todolist', title: "car", isDone: true},
            {id: v1(), title: "yacht", isDone: false},
            {id: v1(), title: "airplane", isDone: false},
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todoListID2', 'id-2task-2todolist')
    const endState = TasksReducer(startState, action)

    expect(endState['todoListID1'].length).toBe(5)
    expect(endState['todoListID2'].length).toBe(3)
    expect(endState['todoListID2'].every(t=>t.id!='2')).toBeTruthy()
})

test('correct task should be added to correct array',()=>{
    const action = addTaskAC('todoListID2','juce')
    const endState = TasksReducer(startState,action)

    expect(endState['todoListID1'].length).toBe(5)
    expect(endState['todoListID2'].length).toBe(5)
    expect(endState['todoListID2'][0].id).toBeDefined()
    expect(endState['todoListID2'][0].title).toBe('juce')
    expect(endState['todoListID2'][0].isDone).toBe(false)
})

test('status of specified task should be changed',()=>{
    const action = changeTaskStatusAC('todoListID2','id-2task-2todolist',false)
    const endState = TasksReducer(startState,action)

    expect(endState['todoListID2'][1].isDone).toBe(false)
    expect(endState['todoListID1'][2].isDone).toBe(false)
})

test('title of specified task should be changed',()=>{
    const action = changeTaskTitleAC('todoListID2','id-2task-2todolist','Milk')
    const endState = TasksReducer(startState,action)

    expect(endState['todoListID2'][1].title).toBe('Milk')
    expect(endState['todoListID1'][1].title).toBe("JS")
})

test('new property with new array should be added when tl is added',()=>{
    const action = addTodoListAC('newTitle')
    const endState = TasksReducer(startState,action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k=>k!== 'todoListID2'&&k!=='todoListID1')
    if(!newKey){
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('property with tlID should be deleted',()=>{
    const action = removeTodoListAC('todoListID2')
    const endState = TasksReducer(startState,action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).toBeUndefined()
})