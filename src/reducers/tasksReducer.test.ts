import {v1} from "uuid";
import {TaskObjectType, TaskPriorities, TaskStatuses} from "../common/types";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./tasksReducer";
import {removeTodoListAC} from "./todoListsReducer";

let startState: TaskObjectType

beforeEach(() => {
	startState = {
		'todoListID1': [
			{
				id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID1',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: v1(), title: "JS", status: TaskStatuses.Completed,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID1',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: v1(), title: "ReactJS", status: TaskStatuses.New,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID1',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: v1(), title: "Rest API", status: TaskStatuses.New,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID1',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: v1(), title: "GraphQL", status: TaskStatuses.New,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID1',
				order: 0, addedDate: '',entityStatus:'loading'
			},
		],
		'todoListID2': [
			{
				id: v1(), title: "apartment", status: TaskStatuses.Completed,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID2',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: 'id-2task-2todolist', title: "car", status: TaskStatuses.Completed,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID2',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: v1(), title: "yacht", status: TaskStatuses.New,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID2',
				order: 0, addedDate: '',entityStatus:'loading'
			},
			{
				id: v1(), title: "airplane", status: TaskStatuses.New,
				description: '', priority: TaskPriorities.Low,
				startDate: '', deadline: '', todoListId: 'todoListID2',
				order: 0, addedDate: '',entityStatus:'loading'
			},
		]
	}
})

test('correct task should be deleted from correct array', () => {

	const action = removeTaskAC('todoListID2', 'id-2task-2todolist')
	const endState = TasksReducer(startState, action)

	expect(endState['todoListID1'].length).toBe(5)
	expect(endState['todoListID2'].length).toBe(3)
	expect(endState['todoListID2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const action = addTaskAC( {todoListId:'todoListID2',title:'juce'})
	const endState = TasksReducer(startState, action)

	expect(endState['todoListID1'].length).toBe(5)
	expect(endState['todoListID2'].length).toBe(5)
	expect(endState['todoListID2'][0].title).toBe('juce')
})

test('status of specified task should be changed', () => {
	const action = changeTaskStatusAC('todoListID2', 'id-2task-2todolist', TaskStatuses.New)
	const endState = TasksReducer(startState, action)

	expect(endState['todoListID2'][1].status).toBe(TaskStatuses.New)
	expect(endState['todoListID1'][2].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
	const action = changeTaskTitleAC('todoListID2', 'id-2task-2todolist', 'Milk')
	const endState = TasksReducer(startState, action)

	expect(endState['todoListID2'][1].title).toBe('Milk')
	expect(endState['todoListID1'][1].title).toBe("JS")
})

test('property with tlID should be deleted', () => {
	const action = removeTodoListAC('todoListID2')
	const endState = TasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todoListID2']).toBeUndefined()
})