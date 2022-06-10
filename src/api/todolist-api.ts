import axios, {AxiosResponse} from 'axios'
import {GetTasksResponse, ResponseType, TaskType, TodoListDomainType, UpdateTaskModelType} from "../common/types";

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': 'f858e3c3-edee-41ba-8558-57f47ccb4139'
	}
})

// api
export const todolistsAPI = {
	getTodolists() {
		return instance.get<TodoListDomainType[]>('todo-lists');
	},
	createTodolist(title: string) {
		return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListDomainType }>>>('todo-lists', {title});
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseType>(`todo-lists/${id}`);
	},
	updateTodolist(id: string, title: string) {
		return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});
	},
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	createTask(todolistId: string, title: string) {
		return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
	}
}


