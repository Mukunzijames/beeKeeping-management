import axios from "axios";

export interface Equipment {
  id: number;
  name: string;
  type: string;
  status: string;
  purchaseDate: Date | null;
  lastMaintenance: Date | null;
  notes: string | null;
}

export interface EquipmentInput {
  name: string;
  type: string;
  status: string;
  purchaseDate?: Date | null;
  lastMaintenance?: Date | null;
  notes?: string | null;
}

const equipmentApi = {
  getAll: async (): Promise<Equipment[]> => {
    const response = await axios.get('/api/equipment');
    return response.data;
  },

  getById: async (id: number): Promise<Equipment> => {
    const response = await axios.get(`/api/equipment/${id}`);
    return response.data;
  },

  create: async (data: EquipmentInput): Promise<Equipment> => {
    const response = await axios.post('/api/equipment', data);
    return response.data;
  },

  update: async (id: number, data: EquipmentInput): Promise<Equipment> => {
    const response = await axios.put(`/api/equipment/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<Equipment> => {
    const response = await axios.delete(`/api/equipment/${id}`);
    return response.data;
  },
};

export default equipmentApi;
