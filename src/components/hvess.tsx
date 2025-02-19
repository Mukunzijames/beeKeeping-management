'use client';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useHives, useDeleteHive, useUpdateHive } from '@/hooks/useHives';
import { Hive } from '@/service/hives';

export default function HvessPage() {
  const router = useRouter();
  const { data: hives, isLoading } = useHives();
  const deleteHiveMutation = useDeleteHive();
  const updateHiveMutation = useUpdateHive();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Hive>>({});

  const handleDelete = async (id: number) => {
    try {
      await deleteHiveMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting hive:', error);
    }
  };

  const handleEdit = (hive: Hive) => {
    setEditingId(hive.id);
    setEditForm(hive);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateHiveMutation.mutateAsync({
        id,
        data: {
          location: editForm.location || '',
          type: editForm.type || '',
          condition: editForm.condition || '',
          colonyStrength: editForm.colonyStrength || ''
        }
      });
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating hive:', error);
    }
  };

  const getConditionColor = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 font-sans text-sm">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search...."
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
        />
        <button 
          onClick={() => router.push('/dashboard/hives/new')}
          className="bg-amber-600 text-white px-3 py-1.5 rounded text-xs hover:bg-amber-700"
        >
          Add Hive
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left font-medium text-gray-600">LOCATION</th>
                <th className="p-3 text-left font-medium text-gray-600">TYPE</th>
                <th className="p-3 text-left font-medium text-gray-600">CONDITION</th>
                <th className="p-3 text-left font-medium text-gray-600">COLONY STRENGTH</th>
                <th className="p-3 text-left font-medium text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hives?.map((hive) => (
                <tr key={hive.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="p-1 border rounded text-xs w-full"
                      />
                    ) : hive.location}
                  </td>
                  <td className="p-3">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.type || ''}
                        onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                        className="p-1 border rounded text-xs w-full"
                      />
                    ) : hive.type}
                  </td>
                  <td className="p-3">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.condition || ''}
                        onChange={(e) => setEditForm({...editForm, condition: e.target.value})}
                        className="p-1 border rounded text-xs w-full"
                      />
                    ) : (
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getConditionColor(hive.condition)}`}>
                        {hive.condition}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.colonyStrength || ''}
                        onChange={(e) => setEditForm({...editForm, colonyStrength: e.target.value})}
                        className="p-1 border rounded text-xs w-full"
                      />
                    ) : hive.colonyStrength}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {editingId === hive.id ? (
                        <button 
                          onClick={() => handleUpdate(hive.id)}
                          className="p-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700"
                        >
                          Save
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEdit(hive)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <PencilIcon className="h-4 w-4 text-gray-500" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(hive.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
