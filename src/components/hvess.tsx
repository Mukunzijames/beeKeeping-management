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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search...."
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={() => router.push('/dashboard/hives/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New
        </button>
      </div>

      <div className="w-full bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">LOCATION</th>
                <th className="p-4">TYPE</th>
                <th className="p-4">CONDITION</th>
                <th className="p-4">COLONY STRENGTH</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {hives?.map((hive) => (
                <tr key={hive.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="p-1 border rounded"
                      />
                    ) : hive.location}
                  </td>
                  <td className="p-4">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.type || ''}
                        onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                        className="p-1 border rounded"
                      />
                    ) : hive.type}
                  </td>
                  <td className="p-4">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.condition || ''}
                        onChange={(e) => setEditForm({...editForm, condition: e.target.value})}
                        className="p-1 border rounded"
                      />
                    ) : hive.condition}
                  </td>
                  <td className="p-4">
                    {editingId === hive.id ? (
                      <input
                        value={editForm.colonyStrength || ''}
                        onChange={(e) => setEditForm({...editForm, colonyStrength: e.target.value})}
                        className="p-1 border rounded"
                      />
                    ) : hive.colonyStrength}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {editingId === hive.id ? (
                        <button 
                          onClick={() => handleUpdate(hive.id)}
                          className="p-1 bg-green-500 text-white rounded"
                        >
                          Save
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEdit(hive)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <PencilIcon className="h-5 w-5 text-gray-500" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(hive.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
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
