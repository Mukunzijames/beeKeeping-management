'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateHive } from '@/hooks/useHives';
import type { CreateHiveData } from '@/service/hives';
import { toast } from "sonner";

export default function NewHivePage() {
  const router = useRouter();
  const createHiveMutation = useCreateHive();
  const [formData, setFormData] = useState<CreateHiveData>({
    location: '',
    type: '',
    condition: '',
    colonyStrength: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHiveMutation.mutateAsync(formData);
      toast.success('Hive created successfully!');
      router.push('/dashboard/hives');
    } catch (error) {
      console.error('Error creating hive:', error);
      toast.error('Failed to create hive');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Create New Hive</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              >
                <option value="">Select condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colony Strength</label>
              <input
                type="text"
                value={formData.colonyStrength}
                onChange={(e) => setFormData({...formData, colonyStrength: e.target.value})}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={createHiveMutation.isPending}
              className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-amber-300"
            >
              {createHiveMutation.isPending ? 'Creating...' : 'Create Hive'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/hives')}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
