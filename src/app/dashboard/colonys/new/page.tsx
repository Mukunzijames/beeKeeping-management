"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useColony } from '@/hooks/useColony';
import { ColonyHealth } from '@/service/colony';

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
      router.push('/dashboard/colonys');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Colony</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Hive ID:</label>
          <input
            type="number"
            name="hiveId"
            value={formData.hiveId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            <input
              type="checkbox"
              name="queenPresent"
              checked={formData.queenPresent}
              onChange={handleChange}
              className="mr-2"
            />
            Queen Present
          </label>
        </div>

        <div>
          <label className="block mb-2">Brood Pattern:</label>
          <input
            type="text"
            name="broodPattern"
            value={formData.broodPattern}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Pest Presence:</label>
          <input
            type="text"
            name="pestPresence"
            value={formData.pestPresence}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Disease Symptoms:</label>
          <input
            type="text"
            name="diseaseSymptoms"
            value={formData.diseaseSymptoms}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Create Colony'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/colonys')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
