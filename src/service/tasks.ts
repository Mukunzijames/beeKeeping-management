import axios from "axios";

interface TaskData {
  hiveId?: number;
  taskType: string;
  description: string;
  assignedTo?: string;
  dueDate?: Date;
  status: string;
  notes?: string;
  completedAt?: Date;
}



export const tasksService = {
  createTask: async (taskData: TaskData) => {
    const response = await axios.post('/api/tasks', taskData);
    return response.data;
  },

  getTasks: async (hiveId?: string, status?: string) => {
    const params = new URLSearchParams();
    if (hiveId) params.append('hiveId', hiveId);
    if (status) params.append('status', status);
    
    const response = await axios.get(`/api/tasks?${params.toString()}`);
    return response.data;
  },

  updateTask: async (taskId: string, taskData: TaskData) => {
    const response = await axios.put(`/api/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId: string) => {
    const response = await axios.delete(`/api/tasks/${taskId}`);
    return response.data;
  }
};
