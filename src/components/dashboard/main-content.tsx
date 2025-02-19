"use client";

import { useEffect, useState } from "react";
import { useHives } from "@/hooks/useHives";
import { useTasks } from "@/hooks/useTasks";
import { useEquipment } from "@/hooks/useEquipment";
import { useColony } from "@/hooks/useColony";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { Equipment } from "@/service/equipment";

export function DashboardMainContent() {
  const { data: hives } = useHives();
  const { tasks, fetchTasks } = useTasks();
  const { useEquipmentList } = useEquipment();
  const { data: equipment } = useEquipmentList();
  const { getColonies } = useColony();
  const [colonies, setColonies] = useState([]);

  useEffect(() => {
    const fetchColonies = async () => {
      const coloniesData = await getColonies();
      setColonies(coloniesData as any);
    };
    fetchColonies();
  }, [getColonies]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasksByStatus = (tasks || []).reduce((acc: Record<string, number>, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const taskPieData = Object.entries(tasksByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  const equipmentByType = equipment?.reduce((acc: Record<string, number>, eq: Equipment) => {
    acc[eq.type] = (acc[eq.type] || 0) + 1;
    return acc;
  }, {});

  const equipmentData = Object.entries(equipmentByType || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight"
      >
        Apiary Analytics Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Hive Strength Trends</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hives}>
                <defs>
                  <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="colonyStrength" stroke="#8884d8" fillOpacity={1} fill="url(#colorStrength)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Task Distribution</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                  animationBegin={0}
                  animationDuration={1500}
                >
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Equipment Inventory</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <p className="text-lg text-gray-600 mb-2">Total Hives</p>
              <p className="text-3xl font-bold text-purple-600">{hives?.length || 0}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-lg text-gray-600 mb-2">Active Tasks</p>
              <p className="text-3xl font-bold text-blue-600">{tasks?.length || 0}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <p className="text-lg text-gray-600 mb-2">Equipment</p>
              <p className="text-3xl font-bold text-green-600">{equipment?.length || 0}</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <p className="text-lg text-gray-600 mb-2">Colonies</p>
              <p className="text-3xl font-bold text-orange-600">{colonies?.length || 0}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}