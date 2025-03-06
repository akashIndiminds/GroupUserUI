// src/app/master/entities/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Trash, Edit, Eye } from 'lucide-react';

export default function EntitiesPage() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState('');

  useEffect(() => {
    // Simulate API call with a timeout
    const fetchEntities = () => {
      setTimeout(() => {
        const mockEntities = [
          { id: 'EM-0000000001', name: 'John Doe', shortName: 'JDOE', entityType: 'EM', gender: 'M', pan: 'AAAPZ1234C', createTime: '2025-01-15' },
          { id: 'LW-0000000001', name: 'Legal Associates LLP', shortName: 'LEGAL', entityType: 'LW', gender: '', pan: 'AACCL8765D', createTime: '2025-01-20' },
          { id: 'AD-0000000001', name: 'Sarah Johnson', shortName: 'SJOHN', entityType: 'AD', gender: 'F', pan: 'ABCPJ5432Y', createTime: '2025-01-22' },
          { id: 'FI-0000000001', name: 'HDFC Bank Ltd.', shortName: 'HDFC', entityType: 'FI', gender: '', pan: 'AAACH7398P', createTime: '2025-01-25' },
          { id: 'AR-0000000001', name: 'Justice Rajesh Kumar', shortName: 'JRKUMAR', entityType: 'AR', gender: 'M', pan: 'AQTPR4321Z', createTime: '2025-02-01' }
        ];
        setEntities(mockEntities);
        setLoading(false);
      }, 800);
    };

    fetchEntities();
  }, []);

  const entityTypes = {
    EM: 'Employee',
    LW: 'Law Firm',
    AD: 'Advocate',
    AR: 'Arbitrator',
    FI: 'Financial Institution',
    FC: 'FI Customer',
    BA: 'Business Associate',
    VR: 'Vendor',
    OC: 'Other Contact'
  };

  const filteredEntities = entities.filter(entity => {
    const matchesSearch =
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.shortName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = entityTypeFilter === '' || entity.entityType === entityTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Entity Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Entity
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search entities..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-64">
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={entityTypeFilter}
              onChange={(e) => setEntityTypeFilter(e.target.value)}
            >
              <option value="">All Entity Types</option>
              {Object.entries(entityTypes).map(([code, name]) => (
                <option key={code} value={code}>
                  {name} ({code})
                </option>
              ))}
            </select>
          </div>

          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>

          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
            <p>Loading entities...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Entity ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Short Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Gender</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">PAN</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Created On</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((entity) => (
                    <tr key={entity.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-blue-600">{entity.id}</td>
                      <td className="py-3 px-4">{entity.name}</td>
                      <td className="py-3 px-4">{entity.shortName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {entityTypes[entity.entityType] || entity.entityType}
                        </span>
                      </td>
                      <td className="py-3 px-4">{entity.gender || '-'}</td>
                      <td className="py-3 px-4">{entity.pan}</td>
                      <td className="py-3 px-4 text-gray-500">{entity.createTime}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-1 rounded-full hover:bg-blue-100 text-blue-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded-full hover:bg-green-100 text-green-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded-full hover:bg-red-100 text-red-600">
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">
                      No entities found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
