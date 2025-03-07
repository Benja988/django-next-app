import axios from 'axios';

// Define Task type
export interface Task {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
}

// Base API instance
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/tasks/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch all tasks
export const getTasks = async (): Promise<Task[]> => {
    const response = await API.get('/');
    return response.data;
};

// Create a new task
export const createTask = async (task: Task): Promise<Task> => {
    const response = await API.post('/', task);
    return response.data;
};

// Update a task
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await API.put(`/${id}/`, task);
    return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
    await API.delete(`/${id}/`);
};
