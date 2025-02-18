import { useState, useCallback } from 'react';
import { tasksService } from '@/service/tasks';

interface Task {
  id: number;
  hiveId?: number;
  taskType: string;
  description: string;
  assignedTo?: string;
  dueDate?: Date;
  status: string;
  notes?: string;
  completedAt?: Date;
}

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (hiveId?: string, status?: string) => Promise<void>;
  createTask: (taskData: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (taskId: string, taskData: Partial<Task> & { taskType: string }) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (hiveId?: string, status?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksService.getTasks(hiveId, status);
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await tasksService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, taskData: Partial<Task> & { taskType: string }) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTask = await tasksService.updateTask(taskId, taskData as any);
      setTasks(prev => prev.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      setError(null);
      await tasksService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id.toString() !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
}; 