"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useColony } from '@/hooks/useColony';
import { ColonyHealth } from '@/service/colony';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

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
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this colony?')) {
      await deleteColony(id);
      fetchColonies();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ColonyHealth) => {
    setEditForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={() => router.push('/dashboard/colonys/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Colony
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Hive ID</th>
            <th className="px-4 py-2">Queen Present</th>
            <th className="px-4 py-2">Brood Pattern</th>
            <th className="px-4 py-2">Pest Presence</th>
            <th className="px-4 py-2">Disease Symptoms</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colonies.map(colony => (
            <tr key={colony.id} className="border-t border-gray-300">
              <td className="px-4 py-2">{colony.id}</td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <input
                    type="number"
                    value={editForm.hiveId || ''}
                    onChange={(e) => handleChange(e, 'hiveId')}
                    className="border p-1"
                  />
                ) : (
                  colony.hiveId
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <input
                    type="checkbox"
                    checked={editForm.queenPresent || false}
                    onChange={(e) => handleChange(e, 'queenPresent')}
                    className="border p-1"
                  />
                ) : (
                  colony.queenPresent ? 'Yes' : 'No'
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <input
                    type="number"
                    value={editForm.broodPattern || ''}
                    onChange={(e) => handleChange(e, 'broodPattern')}
                    className="border p-1"
                  />
                ) : (
                  colony.broodPattern
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <input
                    type="text"
                    value={editForm.pestPresence || ''}
                    onChange={(e) => handleChange(e, 'pestPresence')}
                    className="border p-1"
                  />
                ) : (
                  colony.pestPresence
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <input
                    type="text"
                    value={editForm.diseaseSymptoms || ''}
                    onChange={(e) => handleChange(e, 'diseaseSymptoms')}
                    className="border p-1"
                  />
                ) : (
                  colony.diseaseSymptoms
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <input
                    type="text"
                    value={editForm.notes || ''}
                    onChange={(e) => handleChange(e, 'notes')}
                    className="border p-1"
                  />
                ) : (
                  colony.notes
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === colony.id ? (
                  <button
                    onClick={handleSave}
                    className="text-green-600 hover:text-green-800 mr-2"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(colony)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(colony.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



