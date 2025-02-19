"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useColony } from '@/hooks/useColony';
import { ColonyHealth } from '@/service/colony';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { toast } from 'sonner';

export default function Colonys() {
  const router = useRouter();
  const { getColonies, deleteColony, updateColony, loading, error } = useColony();
  const [colonies, setColonies] = useState<ColonyHealth[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ColonyHealth>>({});

  useEffect(() => {
    fetchColonies();
  }, []);

  const fetchColonies = async () => {
    const data = await getColonies();
    setColonies(data);
  };

  const handleEdit = (colony: ColonyHealth) => {
    setEditingId(colony.id);
    setEditForm(colony);
  };

  const handleSave = async () => {
    if (editingId && editForm) {
      await updateColony(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      fetchColonies();
      toast.success('Updated!');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this colony?')) {
      await deleteColony(id);
      fetchColonies();
      toast.success('Deleted!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ColonyHealth) => {
    setEditForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (loading) return <div className="text-center p-4 text-sm">Loading...</div>;
  if (error) return <div className="text-center p-4 text-sm text-red-500">{error}</div>;

  return (
    <div className="p-4 font-sans text-sm">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-medium text-gray-800">Colony Management</h1>
        <button
          onClick={() => router.push('/dashboard/colonys/new')}
          className="bg-amber-600 text-white px-3 py-1 rounded text-xs hover:bg-amber-700"
        >
          Add Colony
        </button>
      </div>

      <div className="bg-white rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-2 text-left font-medium">ID</th>
                <th className="p-2 text-left font-medium">Hive</th>
                <th className="p-2 text-left font-medium">Queen</th>
                <th className="p-2 text-left font-medium">Brood</th>
                <th className="p-2 text-left font-medium">Pests</th>
                <th className="p-2 text-left font-medium">Disease</th>
                <th className="p-2 text-left font-medium">Notes</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {colonies.map(colony => (
                <tr key={colony.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{colony.id}</td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <input
                        type="number"
                        value={editForm.hiveId || ''}
                        onChange={(e) => handleChange(e, 'hiveId')}
                        className="w-16 border rounded px-1"
                      />
                    ) : colony.hiveId}
                  </td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <input
                        type="checkbox"
                        checked={editForm.queenPresent || false}
                        onChange={(e) => handleChange(e, 'queenPresent')}
                      />
                    ) : (
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${colony.queenPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {colony.queenPresent ? 'Present' : 'Absent'}
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <input
                        type="text"
                        value={editForm.broodPattern || ''}
                        onChange={(e) => handleChange(e, 'broodPattern')}
                        className="w-20 border rounded px-1"
                      />
                    ) : colony.broodPattern}
                  </td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <input
                        type="text"
                        value={editForm.pestPresence || ''}
                        onChange={(e) => handleChange(e, 'pestPresence')}
                        className="w-20 border rounded px-1"
                      />
                    ) : colony.pestPresence}
                  </td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <input
                        type="text"
                        value={editForm.diseaseSymptoms || ''}
                        onChange={(e) => handleChange(e, 'diseaseSymptoms')}
                        className="w-20 border rounded px-1"
                      />
                    ) : colony.diseaseSymptoms}
                  </td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <input
                        type="text"
                        value={editForm.notes || ''}
                        onChange={(e) => handleChange(e, 'notes')}
                        className="w-20 border rounded px-1"
                      />
                    ) : colony.notes}
                  </td>
                  <td className="p-2">
                    {editingId === colony.id ? (
                      <FaSave 
                        onClick={handleSave}
                        className="w-4 h-4 text-green-600 cursor-pointer"
                      />
                    ) : (
                      <div className="flex gap-2">
                        <FaEdit
                          onClick={() => handleEdit(colony)}
                          className="w-4 h-4 text-amber-600 cursor-pointer"
                        />
                        <FaTrash
                          onClick={() => handleDelete(colony.id)}
                          className="w-4 h-4 text-red-600 cursor-pointer"
                        />
                      </div>
                    )}
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
