"use client";

import { useState } from 'react';

export default function ColonyPage() {
  const [showFundedOnly, setShowFundedOnly] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);

  const companies = [
    {
      name: "LottieFiles",
      country: "Malaysia",
      industry: "Software as a Service",
      stage: "Pre-revenue",
      fundedBy: "500 Startups"
    },
    {
      name: "LottieFiles",
      country: "Malaysia",
      industry: "Software as a Service",
      stage: "Pre-revenue",
      fundedBy: "500 Startups"
    },
    {
      name: "LottieFiles",
      country: "Malaysia",
      industry: "Software as a Service",
      stage: "Pre-revenue",
      fundedBy: "500 Startups"
    }
  ];

  const handleCheckboxChange = (index: number) => {
    setSelectedCompanies(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleFundedOnlyChange = () => {
    setShowFundedOnly(prev => !prev);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Companies 1,260</h1>
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <button className="text-purple-600 border-b-2 border-purple-600 pb-2 font-medium hover:text-purple-700 transition-colors">
              General View
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors pb-2">
              Bootstrapped Companies
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors pb-2">
              Pre-seed Stage
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <span>Sort</span>
          </button>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFundedOnly}
              onChange={handleFundedOnlyChange}
              className="form-checkbox text-purple-600 rounded"
            />
            <span>Funded companies</span>
          </label>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            Download CSV
          </button>
          <button className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            Add companies
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="pl-6 pr-4 py-4 w-12">
                <input type="checkbox" className="form-checkbox rounded" readOnly />
              </th>
              <th className="px-4 py-4 font-medium">Companies</th>
              <th className="px-4 py-4 font-medium">Country</th>
              <th className="px-4 py-4 font-medium">Industry</th>
              <th className="px-4 py-4 font-medium">Stage</th>
              <th className="px-4 py-4 font-medium">Funded by</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                <td className="pl-6 pr-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="form-checkbox rounded"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{company.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">{company.country}</td>
                <td className="px-4 py-4">{company.industry}</td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 text-purple-600 bg-purple-100 rounded-full text-sm font-medium">
                    {company.stage}
                  </span>
                </td>
                <td className="px-4 py-4">{company.fundedBy}</td>
                <td className="w-10">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="text-gray-500">...</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 