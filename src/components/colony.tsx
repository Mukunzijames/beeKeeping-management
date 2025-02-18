"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';

export default function ColonyPage() {
  const router = useRouter();
  const { tasks, loading, error, fetchTasks } = useTasks();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

  const filteredTasks = showCompletedOnly 
    ? tasks.filter(task => task.status === 'completed')
    : tasks;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Tasks {tasks.length}</h1>
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <button className="text-purple-600 border-b-2 border-purple-600 pb-2 font-medium hover:text-purple-700 transition-colors">
              All Tasks
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors pb-2">
              In Progress
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors pb-2">
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <span>Sort</span>
          </button>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCompletedOnly}
              onChange={handleCompletedOnlyChange}
              className="form-checkbox text-purple-600 rounded"
            />
            <span>Completed tasks</span>
          </label>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            Download CSV
          </button>
          <button 
            onClick={handleAddTask}
            className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="pl-6 pr-4 py-4 w-12">
                <input type="checkbox" className="form-checkbox rounded" readOnly />
              </th>
              <th className="px-4 py-4 font-medium">Task Type</th>
              <th className="px-4 py-4 font-medium">Description</th>
              <th className="px-4 py-4 font-medium">Assigned To</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-4 py-4 font-medium">Due Date</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="pl-6 pr-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleCheckboxChange(task.id)}
                    className="form-checkbox rounded"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{task.taskType}</span>
                  </div>
                </td>
                <td className="px-4 py-4">{task.description}</td>
                <td className="px-4 py-4">{task.assignedTo || 'Unassigned'}</td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 text-purple-600 bg-purple-100 rounded-full text-sm font-medium">
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</td>
                <td className="w-10">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="text-gray-500">...</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}