import axios from "axios";

export interface Hive {
  id: number;
  location: string;
  type: string;
  condition: string;
  colonyStrength: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHiveData {
  location: string;
  type: string;
  condition: string;
  colonyStrength: string;
}

// API functions
export const createHive = async (data: CreateHiveData): Promise<Hive> => {
  const response = await axios.post('/api/hive', data);
  return response.data;
};

export const getHives = async (): Promise<Hive[]> => {
  const response = await axios.get('/api/hive');
  return response.data;
};

export const getHive = async (id: number): Promise<Hive> => {
  const response = await axios.get(`/api/hive/${id}`);
  return response.data;
};

export const updateHive = async (id: number, data: CreateHiveData): Promise<Hive> => {
  const response = await axios.put(`/api/hive/${id}`, data);
  return response.data;
};

export const deleteHive = async (id: number): Promise<Hive> => {
  const response = await axios.delete(`/api/hive/${id}`);
  return response.data;
};

