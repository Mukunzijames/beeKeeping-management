'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEquipment } from '@/hooks/useEquipment';
import { toast } from 'sonner';

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
      toast.success('Equipment created successfully!');
      router.push('/dashboard/equipment');
    } catch (error) {
      console.error('Error creating equipment:', error);
      toast.error('Failed to create equipment');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Create New Equipment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                required
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
              <input
                type="date"
                value={formData.lastMaintenance}
                onChange={(e) => setFormData(prev => ({ ...prev, lastMaintenance: e.target.value }))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={createEquipment.isPending}
              className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-amber-300"
            >
              {createEquipment.isPending ? 'Creating...' : 'Create Equipment'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/equipment')}
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