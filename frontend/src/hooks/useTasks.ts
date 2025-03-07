import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask, Task } from '../services/api';

// Fetch all tasks
export const useTasks = () => {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
};

// Create a task
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, unknown, Task>({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

// Update a task
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, unknown, { id: number; task: Partial<Task> }>({
        mutationFn: ({ id, task }) => updateTask(id, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

// Delete a task
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, number>({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};
