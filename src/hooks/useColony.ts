import { useState, useCallback } from 'react';
import { ColonyHealth, colonyService } from '@/service/colony';

export const useColony = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getColonies = useCallback(async (hiveId?: number) => {
    try {
      setLoading(true);
      setError(null);
      return await colonyService.getColonies(hiveId);
    } catch (err) {
      setError('Failed to fetch colonies');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getColony = useCallback(async (colonyId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await colonyService.getColony(colonyId);
    } catch (err) {
      setError('Failed to fetch colony');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createColony = useCallback(async (data: Omit<ColonyHealth, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      setError(null);
      return await colonyService.createColony(data);
    } catch (err) {
      setError('Failed to create colony');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateColony = useCallback(async (
    colonyId: number,
    data: Partial<Omit<ColonyHealth, 'id' | 'createdAt' | 'hiveId'>>
  ) => {
    try {
      setLoading(true);
      setError(null);
      return await colonyService.updateColony(colonyId, data);
    } catch (err) {
      setError('Failed to update colony');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteColony = useCallback(async (colonyId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await colonyService.deleteColony(colonyId);
    } catch (err) {
      setError('Failed to delete colony');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getColonies,
    getColony,
    createColony,
    updateColony,
    deleteColony,
  };
}; 