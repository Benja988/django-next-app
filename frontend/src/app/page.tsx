"use client";

import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, Task } from '../services/api';

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Partial<Task>>({ title: '', description: '', completed: false });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTask(newTask as Task);
        setNewTask({ title: '', description: '', completed: false });
        fetchTasks();
    };

    const handleUpdate = async (id: number, task: Task) => {
        await updateTask(id, { ...task, completed: !task.completed });
        fetchTasks();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <form onSubmit={handleCreate} className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title || ''}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    placeholder="Description"
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            </form>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="border p-4 rounded">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.completed ? "Completed" : "Pending"}</p>
                        <div className="flex space-x-2 mt-2">
                            <button onClick={() => handleUpdate(task.id!, task)} className="bg-yellow-500 text-white p-2 rounded">
                                {task.completed ? "Mark as Pending" : "Mark as Completed"}
                            </button>
                            <button onClick={() => handleDelete(task.id!)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}