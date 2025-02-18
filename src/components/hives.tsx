'use client';

import { useState } from 'react';

interface TableRow {
  item: string;
  vendor: string;
  location: string;
  date: string;
  totalAmount: string;
}

export default function HivesPage() {
  const [data] = useState<TableRow[]>([
    {
      item: 'Laptops',
      vendor: 'Marvin',
      location: 'Alyko',
      date: '26/04/2020',
      totalAmount: '$4,231.01',
    },
    {
      item: 'Laptops',
      vendor: 'Marvin',
      location: 'Alyko',
      date: '26/04/2020',
      totalAmount: '$4,231.01',
    },
    {
      item: 'Laptops',
      vendor: 'Marvin',
      location: 'Alyko',
      date: '26/04/2020',
      totalAmount: '$4,231.01',
    },
    {
      item: 'Laptops',
      vendor: 'Marvin',
      location: 'Alyko',
      date: '26/04/2020',
      totalAmount: '$4,231.01',
    },
    {
      item: 'Laptops',
      vendor: 'Marvin',
      location: 'Alyko',
      date: '26/04/2020',
      totalAmount: '$4,231.01',
    },
    {
      item: 'Laptops',
      vendor: 'Marvin',
      location: 'Alyko',
      date: '26/04/2020',
      totalAmount: '$4,231.01',
    },
  ]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search...."
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="w-full bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-4 text-gray-600">ITEM</th>
                <th className="p-4 text-gray-600">VENDOR</th>
                <th className="p-4 text-gray-600">LOCATION</th>
                <th className="p-4 text-gray-600">DATE</th>
                <th className="p-4 text-gray-600">TOTAL AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">{row.item}</td>
                  <td className="p-4">{row.vendor}</td>
                  <td className="p-4">{row.location}</td>
                  <td className="p-4">{row.date}</td>
                  <td className="p-4">{row.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
