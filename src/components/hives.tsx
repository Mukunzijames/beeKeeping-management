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
    router.push('/equipment');
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <div className="text-center p-4 text-sm">Loading...</div>;

  return (
    <div className="p-4 font-sans text-sm">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search...."
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
        />
        <button 
          onClick={() => router.push('/dashboard/equipment/new')}
          className="bg-amber-600 text-white px-3 py-1.5 rounded text-xs hover:bg-amber-700"
        >
          Add Equipment
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left font-medium text-gray-600">NAME</th>
                <th className="p-3 text-left font-medium text-gray-600">TYPE</th>
                <th className="p-3 text-left font-medium text-gray-600">STATUS</th>
                <th className="p-3 text-left font-medium text-gray-600">PURCHASE DATE</th>
                <th className="p-3 text-left font-medium text-gray-600">LAST MAINTENANCE</th>
                <th className="p-3 text-left font-medium text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipment?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {editingId === item.id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm?.name || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, name: e.target.value} : null)}
                          className="p-1 border rounded text-xs w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm?.type || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, type: e.target.value} : null)}
                          className="p-1 border rounded text-xs w-full"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editForm?.status || ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, status: e.target.value} : null)}
                          className="p-1 border rounded text-xs w-full"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="date"
                          value={editForm?.purchaseDate ? new Date(editForm.purchaseDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, purchaseDate: new Date(e.target.value)} : null)}
                          className="p-1 border rounded text-xs w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="date"
                          value={editForm?.lastMaintenance ? new Date(editForm.lastMaintenance).toISOString().split('T')[0] : ''}
                          onChange={(e) => setEditForm(prev => prev ? {...prev, lastMaintenance: new Date(e.target.value)} : null)}
                          className="p-1 border rounded text-xs w-full"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 mr-2 text-xs"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.type}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">{item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : '-'}</td>
                      <td className="p-3">{item.lastMaintenance ? new Date(item.lastMaintenance).toLocaleDateString() : '-'}</td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-amber-600 hover:text-amber-800"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
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
