import axios from "axios";

export interface ColonyHealth {
  id: number;
  hiveId: number;
  queenPresent: boolean;
  broodPattern: string;
  pestPresence: string;
  diseaseSymptoms: string;
  notes: string;
  createdAt: string;
}

export const colonyService = {
  // Get all colonies or colonies by hiveId
  getColonies: async (hiveId?: number) => {
    const response = await axios.get<ColonyHealth[]>('/api/colony' + (hiveId ? `?hiveId=${hiveId}` : ''));
    return response.data;
  },

  // Get single colony by id
  getColony: async (colonyId: number) => {
    const response = await axios.get<ColonyHealth[]>(`/api/colony/${colonyId}`);
    return response.data[0];
  },

  // Create new colony health record
  createColony: async (data: Omit<ColonyHealth, 'id' | 'createdAt'>) => {
    const response = await axios.post<ColonyHealth>('/api/colony', data);
    return response.data;
  },

  // Update colony health record
  updateColony: async (colonyId: number, data: Partial<Omit<ColonyHealth, 'id' | 'createdAt' | 'hiveId'>>) => {
    const response = await axios.put<ColonyHealth>(`/api/colony/${colonyId}`, data);
    return response.data;
  },

  // Delete colony health record
  deleteColony: async (colonyId: number) => {
    const response = await axios.delete<ColonyHealth>(`/api/colony/${colonyId}`);
    return response.data;
  },
};