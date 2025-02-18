'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEquipment } from '@/hooks/useEquipment';

export default function NewEquipmentPage() {
  const router = useRouter();
  const { useCreateEquipment } = useEquipment();
  const createEquipment = useCreateEquipment();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    purchaseDate: '',
    lastMaintenance: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEquipment.mutateAsync({
        ...formData,
        purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate) : null,
        lastMaintenance: formData.lastMaintenance ? new Date(formData.lastMaintenance) : null,
      });
      router.push('/equipment');
    } catch (error) {
      console.error('Error creating equipment:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Equipment</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Purchase Date</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Last Maintenance</label>
            <input
              type="date"
              value={formData.lastMaintenance}
              onChange={(e) => setFormData(prev => ({ ...prev, lastMaintenance: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Equipment
            </button>
            <button
              type="button"
              onClick={() => router.push('/equipment')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 