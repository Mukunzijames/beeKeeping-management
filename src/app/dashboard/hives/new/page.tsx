'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateHive } from '@/hooks/useHives';
import type { CreateHiveData } from '@/service/hives';

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
      router.push('/dashboard/hives');
    } catch (error) {
      console.error('Error creating hive:', error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Hive</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Type</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Condition</label>
          <input
            type="text"
            value={formData.condition}
            onChange={(e) => setFormData({...formData, condition: e.target.value})}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Colony Strength</label>
          <input
            type="text"
            value={formData.colonyStrength}
            onChange={(e) => setFormData({...formData, colonyStrength: e.target.value})}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Hive
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/hives')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
