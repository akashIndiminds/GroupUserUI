// src/app/transactions/cases/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal, 
  Calendar, 
  CalendarDays, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle, 
  Clock 
} from 'lucide-react';

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  useEffect(() => {
    // Add custom CSS to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Custom Animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
        70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
      
      /* Custom Classes */
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-pulse-blue {
        animation: pulse 2s infinite;
      }
      
      /* Hover Effects */
      .hover-lift {
        transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
      }
      
      .hover-lift:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      /* Custom Scrollbar */
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      
      /* Table Styles */
      .case-table th {
        position: sticky;
        top: 0;
        background: #f8fafc;
        z-index: 10;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      
      .case-table tbody tr {
        transition: all 0.2s ease-out;
      }
      
      .case-table tbody tr:hover {
        background-color: #f1f5f9;
      }
      
      /* Status Badge Styles */
      .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        transition: all 0.2s ease;
      }
      
      .status-badge:hover {
        transform: scale(1.05);
      }
      
      /* Card View Styles */
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1rem;
      }
      
      .card {
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease-out;
        overflow: hidden;
        height: 100%;
      }
      
      .card:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
      }
      
      /* Focus Styles */
      .focus-ring:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      }
      
      /* Button Glow Effect */
      .glow-blue:hover {
        box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
      }
    `;
    document.head.appendChild(styleElement);
    
    // Simulate API call
    setTimeout(() => {
      const mockCases = [
        { id: 'ARB-2025020045', number: 'ARB-2025020045', title: 'HDFC Bank vs. Sharma Enterprises', type: 'ARB', status: 'In Progress', entity: 'HDFC Bank Ltd.', createDate: '2025-03-02', department: 'Legal' },
        { id: 'ARB-2025020039', number: 'ARB-2025020039', title: 'SBI vs. Modern Solutions Ltd.', type: 'ARB', status: 'Scheduled', entity: 'State Bank of India', createDate: '2025-02-28', department: 'Recovery' },
        { id: 'ARB-2025020032', number: 'ARB-2025020032', title: 'Axis Bank vs. Royal Construction', type: 'ARB', status: 'Pending', entity: 'Axis Bank', createDate: '2025-02-25', department: 'Legal' },
        { id: 'ARB-2025020028', number: 'ARB-2025020028', title: 'ICICI Bank vs. Patel Brothers', type: 'ARB', status: 'In Progress', entity: 'ICICI Bank', createDate: '2025-02-23', department: 'Recovery' },
        { id: 'ARB-2025020015', number: 'ARB-2025020015', title: 'Kotak Bank vs. Excel Industries', type: 'ARB', status: 'Closed', entity: 'Kotak Mahindra Bank', createDate: '2025-02-15', department: 'Legal' }
      ];
      setCases(mockCases);
      setLoading(false);
    }, 800);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = 
      caseItem.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.entity.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter ? caseItem.status === statusFilter : true;
    const matchesDepartment = departmentFilter ? caseItem.department === departmentFilter : true;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get status icon based on status
  const getStatusIcon = (status) => {
    switch(status) {
      case 'In Progress':
        return <Clock className="w-3 h-3" />;
      case 'Scheduled':
        return <Calendar className="w-3 h-3" />;
      case 'Pending':
        return <AlertCircle className="w-3 h-3" />;
      case 'Closed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };
  
  // Get status style based on status
  const getStatusStyle = (status) => {
    switch(status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Scheduled':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-gray-200">
        {/* Updated title with a visible dark text color */}
        <h1 className="text-2xl font-bold text-blue-800">
          Case Management
        </h1>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-md flex items-center shadow-md hover:shadow-lg transition-all duration-300 glow-blue">
          <Plus className="w-4 h-4 mr-2" />
          Create New Case
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl shadow-sm hover-lift border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cases by number, title, entity..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-64">
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200 text-gray-900"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          
          <div className="w-64">
            <div className="relative">
              <select 
                className="w-full px-4 py-2.5 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200 text-gray-900"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Legal">Legal</option>
                <option value="Recovery">Recovery</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-2.5 border rounded-lg transition-all duration-200 flex items-center focus:ring ${
                viewMode === 'table' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'hover:bg-gray-50 bg-white text-gray-900'
              }`}
              onClick={() => setViewMode('table')}
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button 
              className={`px-4 py-2.5 border rounded-lg transition-all duration-200 flex items-center focus:ring ${
                viewMode === 'card' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'hover:bg-gray-50 bg-white text-gray-900'
              }`}
              onClick={() => setViewMode('card')}
            >
              <CalendarDays className="w-4 h-4" />
            </button>
          </div>

          <button className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center transition-all duration-200 focus:ring bg-white text-gray-900">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>

          <button className="px-4 py-2.5 border rounded-lg hover:bg-gray-50 flex items-center transition-all duration-200 focus:ring bg-white text-gray-900">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Data Display */}
      <div className={`bg-white rounded-xl shadow-sm ${loading ? '' : 'hover-lift'} border border-gray-100`}>
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 mb-4 animate-pulse-blue"></div>
            <p className="text-gray-500 font-medium">Loading cases...</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full case-table">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-white border-b">
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Case Number</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Title</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Entity</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Created</th>
                  <th className="text-center py-3.5 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.length > 0 ? (
                  filteredCases.map((caseItem, index) => (
                    <tr 
                      key={caseItem.id} 
                      className="border-b hover:bg-blue-50 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="py-3.5 px-4 font-medium text-blue-600">{caseItem.number}</td>
                      <td className="py-3.5 px-4 text-gray-900">{caseItem.title}</td>
                      <td className="py-3.5 px-4">
                        <span className={`status-badge ${getStatusStyle(caseItem.status)}`}>
                          {getStatusIcon(caseItem.status)}
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-900">{caseItem.entity}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-xs ${
                          caseItem.department === 'Legal' 
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-100' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                        }`}>
                          {caseItem.department}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{formatDate(caseItem.createDate)}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-full hover:bg-green-100 text-green-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <SearchIcon className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium mb-1">No cases found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4">
            <div className="card-grid">
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem, index) => (
                  <div 
                    key={caseItem.id} 
                    className="card animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-medium text-blue-600">{caseItem.number}</div>
                        <span className={`status-badge ${getStatusStyle(caseItem.status)}`}>
                          {getStatusIcon(caseItem.status)}
                          {caseItem.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-3">{caseItem.title}</h3>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Entity:</span> {caseItem.entity}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Department:</span>{' '}
                        <span className={`px-2 py-0.5 rounded-md text-xs ${
                          caseItem.department === 'Legal' 
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-100' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                        }`}>
                          {caseItem.department}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Created:</span> {formatDate(caseItem.createDate)}
                      </div>
                      <div className="flex space-x-2 pt-3 border-t border-gray-100">
                        <button className="p-1.5 rounded-md hover:bg-blue-100 text-blue-600 transition-colors flex items-center text-sm font-medium">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-green-100 text-green-600 transition-colors flex items-center text-sm font-medium">
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors flex items-center text-sm font-medium ml-auto">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <SearchIcon className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium mb-1">No cases found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Custom search icon for empty states
const SearchIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);
