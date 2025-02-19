"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TaskFormData = {
  hiveId: string;
  taskType: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  notes: string;
};

export default function NewTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TaskFormData>({
    hiveId: "",
    taskType: "feeding",
    description: "",
    assignedTo: "", 
    dueDate: "",
    status: "pending",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard/colony');
      } else {
        throw new Error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-6 font-sans text-sm">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-amber-800">Create New Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hiveId" className="block text-xs font-medium text-gray-700 mb-1">
              Hive ID
            </label>
            <input
              type="text"
              id="hiveId"
              name="hiveId"
              value={formData.hiveId}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-xs border rounded focus:ring-1 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="taskType" className="block text-xs font-medium text-gray-700 mb-1">
              Task Type
            </label>
            <select
              id="taskType"
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-xs border rounded focus:ring-1 focus:ring-amber-500 focus:border-transparent"
              required
            >
              <option value="feeding">Feeding</option>
              <option value="inspection">Inspection</option>
              <option value="treatment">Treatment</option>
              <option value="harvest">Harvest</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-1.5 text-xs border rounded focus:ring-1 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="assignedTo" className="block text-xs font-medium text-gray-700 mb-1">
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-xs border rounded focus:ring-1 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-xs font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-xs border rounded focus:ring-1 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-xs font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-1.5 text-xs border rounded focus:ring-1 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-1.5 text-xs bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
          >
            Create Task
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/colony')}
            className="px-4 py-1.5 text-xs border rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}