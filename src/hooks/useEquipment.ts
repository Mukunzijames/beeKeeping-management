import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import equipmentApi, { EquipmentInput } from '@/service/equipment';



interface Equipment {
  id: number;
  name: string;
  type: string;
  status: string;
  purchaseDate: Date | null;
  lastMaintenance: Date | null;
  notes: string | null;
}

export const useEquipment = () => {
  const queryClient = useQueryClient();

  // Get all equipment
  const useEquipmentList = () => {
    return useQuery({
      queryKey: ['equipment'],
      queryFn: equipmentApi.getAll,
    });
  };

  // Get single equipment
  const useEquipmentById = (id: number) => {
    return useQuery({
      queryKey: ['equipment', id],
      queryFn: () => equipmentApi.getById(id),
    });
  };

  // Create equipment
  const useCreateEquipment = () => {
    return useMutation({
      mutationFn: (data: EquipmentInput) => equipmentApi.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['equipment'] });
      },
    });
  };

  // Update equipment
  const useUpdateEquipment = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: EquipmentInput }) =>
        equipmentApi.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['equipment'] });
      },
    });
  };

  // Delete equipment
  const useDeleteEquipment = () => {
    return useMutation({
      mutationFn: (id: number) => equipmentApi.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['equipment'] });
      },
    });
  };

  return {
    useEquipmentList,
    useEquipmentById,
    useCreateEquipment,
    useUpdateEquipment,
    useDeleteEquipment,
  };
}; 