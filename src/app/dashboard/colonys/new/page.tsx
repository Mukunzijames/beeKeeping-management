"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useColony } from '@/hooks/useColony';
import { ColonyHealth } from '@/service/colony';
import { toast } from 'sonner';

export default function NewColony() {
  const router = useRouter();
  const { createColony, loading, error } = useColony();
  const [formData, setFormData] = useState<Omit<ColonyHealth, 'id' | 'createdAt'>>({
    hiveId: 0,
    queenPresent: false,
    broodPattern: '',
    pestPresence: '',
    diseaseSymptoms: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createColony(formData);
    if (result) {
      toast.success('Colony created successfully!');
      router.push('/dashboard/colonys');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Create New Colony</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hive ID</label>
              <input
                type="number"
                name="hiveId"
                value={formData.hiveId}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="queenPresent"
                  checked={formData.queenPresent}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                <span className="ml-2 text-sm text-gray-700">Queen Present</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brood Pattern</label>
              <input
                type="text"
                name="broodPattern"
                value={formData.broodPattern}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pest Presence</label>
              <input
                type="text"
                name="pestPresence"
                value={formData.pestPresence}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disease Symptoms</label>
              <input
                type="text"
                name="diseaseSymptoms"
                value={formData.diseaseSymptoms}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-amber-300"
            >
              {loading ? 'Creating...' : 'Create Colony'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/colonys')}
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
