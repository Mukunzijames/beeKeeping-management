'use client';

import { useState } from 'react';
import { useEquipment } from '@/hooks/useEquipment';
import { Equipment } from '@/service/equipment';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function HivesPage() {
  const router = useRouter();
  const { useEquipmentList, useDeleteEquipment, useUpdateEquipment, useCreateEquipment } = useEquipment();
  const { data: equipment, isLoading } = useEquipmentList();
  const deleteEquipment = useDeleteEquipment();
  const updateEquipment = useUpdateEquipment();
  const createEquipment = useCreateEquipment();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Equipment | null>(null);

  const handleEdit = (equipment: Equipment) => {
    setEditingId(equipment.id);
    setEditForm(equipment);
  };

  const handleSave = async () => {
    if (editForm) {
      await updateEquipment.mutateAsync({
        id: editForm.id,
        data: {
          name: editForm.name,
          type: editForm.type,
          status: editForm.status,
          purchaseDate: editForm.purchaseDate,
          lastMaintenance: editForm.lastMaintenance,
          notes: editForm.notes
        }
      });
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteEquipment.mutateAsync(id);
  };

  const handleCreate = async (newEquipment: Omit<Equipment, 'id'>) => {
    await createEquipment.mutateAsync(newEquipment);
    router.push('/equipment'); // Redirect back to equipment list after creation
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
          onClick={() => router.push('/dashboard/equipment/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Equipment
        </button>
      </div>
      
      <div className="w-full bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">NAME</th>
                <th className="p-4">TYPE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">PURCHASE DATE</th>
                <th className="p-4">LAST MAINTENANCE</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {equipment?.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {editingId === item.id ? (
                    <>
                      <td className="p-4">
                        <input
                          type="text"
                          value={editForm?.name || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, name: e.target.value} : null)}
                          className="p-1 border rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          value={editForm?.type || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, type: e.target.value} : null)}
                          className="p-1 border rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          value={editForm?.status || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, status: e.target.value} : null)}
                          className="p-1 border rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="date"
                          value={editForm?.purchaseDate ? new Date(editForm.purchaseDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, purchaseDate: new Date(e.target.value)} : null)}
                          className="p-1 border rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="date"
                          value={editForm?.lastMaintenance ? new Date(editForm.lastMaintenance).toISOString().split('T')[0] : ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, lastMaintenance: new Date(e.target.value)} : null)}
                          className="p-1 border rounded"
                        />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.type}</td>
                      <td className="p-4">{item.status}</td>
                      <td className="p-4">{item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : '-'}</td>
                      <td className="p-4">{item.lastMaintenance ? new Date(item.lastMaintenance).toLocaleDateString() : '-'}</td>
                      <td className="p-4 flex">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
