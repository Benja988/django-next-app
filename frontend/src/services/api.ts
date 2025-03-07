import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

// Define Task type
export interface Task {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
    const response = await axios.post(API_URL, task);
    return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}${id}/`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};
