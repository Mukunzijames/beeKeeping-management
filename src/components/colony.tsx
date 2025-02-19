"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export default function ColonyPage() {
  const router = useRouter();
  const { tasks, loading, error, fetchTasks, deleteTask, updateTask } = useTasks();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setEditForm(task);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateTask(id.toString(), editForm);
      setEditingId(null);
      setEditForm({});
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id.toString());
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleCheckboxChange = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleCompletedOnlyChange = () => {
    setShowCompletedOnly(prev => !prev);
  };

  const handleAddTask = () => {
    router.push('/dashboard/tasks/new');
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = showCompletedOnly 
    ? tasks.filter(task => task.status === 'completed')
    : tasks;

  if (loading) return <div className="text-sm">Loading...</div>;
  if (error) return <div className="text-sm text-red-500">Error: {error}</div>;

  return (
    <div className="w-full font-sans">
      <h1 className="text-2xl font-bold mb-6">Tasks ({tasks.length})</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button className="text-xs px-3 py-1.5 border rounded hover:bg-gray-50">
            Filter
          </button>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={showCompletedOnly}
              onChange={handleCompletedOnlyChange}
              className="form-checkbox text-amber-600 rounded"
            />
            <span>Show completed only</span>
          </label>
        </div>
        <button 
          onClick={handleAddTask}
          className="text-xs px-4 py-1.5 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 text-left font-medium text-gray-600">TYPE</th>
              <th className="p-3 text-left font-medium text-gray-600">DESCRIPTION</th>
              <th className="p-3 text-left font-medium text-gray-600">ASSIGNED TO</th>
              <th className="p-3 text-left font-medium text-gray-600">STATUS</th>
              <th className="p-3 text-left font-medium text-gray-600">DUE DATE</th>
              <th className="p-3 text-left font-medium text-gray-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="p-3">
                  {editingId === task.id ? (
                    <input
                      value={editForm.taskType || ''}
                      onChange={(e) => setEditForm({...editForm, taskType: e.target.value})}
                      className="p-1 border rounded text-xs w-full"
                    />
                  ) : task.taskType}
                </td>
                <td className="p-3">
                  {editingId === task.id ? (
                    <input
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="p-1 border rounded text-xs w-full"
                    />
                  ) : task.description}
                </td>
                <td className="p-3">
                  {editingId === task.id ? (
                    <input
                      value={editForm.assignedTo || ''}
                      onChange={(e) => setEditForm({...editForm, assignedTo: e.target.value})}
                      className="p-1 border rounded text-xs w-full"
                    />
                  ) : task.assignedTo || 'Unassigned'}
                </td>
                <td className="p-3">
                  {editingId === task.id ? (
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="p-1 border rounded text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {editingId === task.id ? (
                    <input
                      type="date"
                      value={editForm.dueDate || ''}
                      onChange={(e) => setEditForm({...editForm, dueDate: e.target.value})}
                      className="p-1 border rounded text-xs"
                    />
                  ) : task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {editingId === task.id ? (
                      <button
                        onClick={() => handleUpdate(task.id)}
                        className="p-1 text-amber-600 hover:text-amber-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}