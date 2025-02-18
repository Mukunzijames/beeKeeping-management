import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getHives, 
  getHive, 
  createHive, 
  updateHive, 
  deleteHive,
  type CreateHiveData,
  type Hive 
} from '@/service/hives';

export const useHives = () => {
  return useQuery<Hive[]>({
    queryKey: ['hives'],
    queryFn: getHives,
  });
};

export const useHive = (id: number) => {
  return useQuery<Hive>({
    queryKey: ['hive', id],
    queryFn: () => getHive(id),
  });
};

export const useCreateHive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateHiveData) => createHive(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hives'] });
    },
  });
};

export const useUpdateHive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateHiveData }) => 
      updateHive(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hives'] });
      queryClient.invalidateQueries({ queryKey: ['hive', variables.id] });
    },
  });
};

export const useDeleteHive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteHive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hives'] });
    },
  });
}; 