'use client';
import React, { useState } from 'react';
import { 
  FileText, FolderOpen, Download, Search, Filter, Upload, 
  Eye, Trash2, Clock, ChevronDown, ArrowUpDown, Calendar,
  User, Tag, MoreHorizontal, Check, Folder, GridIcon, ListIcon
} from 'lucide-react';

export default function DocumentRepository() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Mock data
  const documentCategories = [
    { id: 'all', name: 'All Documents', count: 643 },
    { id: 'pleadings', name: 'Pleadings', count: 127 },
    { id: 'evidences', name: 'Evidences', count: 215 },
    { id: 'orders', name: 'Orders', count: 48 },
    { id: 'correspondence', name: 'Correspondence', count: 152 },
    { id: 'settlements', name: 'Settlements', count: 42 },
    { id: 'awards', name: 'Awards', count: 35 },
    { id: 'others', name: 'Others', count: 24 }
  ];

  const documents = [
    { 
      id: 'doc1', 
      name: 'Statement of Claim.pdf', 
      category: 'pleadings',
      caseId: 'ARB-2025020045',
      caseTitle: 'HDFC Bank vs. Sharma Enterprises',
      uploadedBy: 'Rahul Sharma',
      uploadedDate: '02 Mar 2025',
      size: '3.5 MB',
      tags: ['Important', 'Claim'],
      status: 'Verified'
    },
    { 
      id: 'doc2', 
      name: 'Bank Statement - Jan 2025.xlsx', 
      category: 'evidences',
      caseId: 'ARB-2025020045',
      caseTitle: 'HDFC Bank vs. Sharma Enterprises',
      uploadedBy: 'Neha Patel',
      uploadedDate: '28 Feb 2025',
      size: '1.2 MB',
      tags: ['Financial', 'Statement'],
      status: 'Verified'
    },
    { 
      id: 'doc3', 
      name: 'Appointment of Arbitrator.pdf', 
      category: 'orders',
      caseId: 'ARB-2025020039',
      caseTitle: 'SBI vs. Modern Solutions Ltd.',
      uploadedBy: 'Vikram Singh',
      uploadedDate: '26 Feb 2025',
      size: '420 KB',
      tags: ['Procedural'],
      status: 'Verified'
    },
    { 
      id: 'doc4', 
      name: 'Expert Witness Report.pdf', 
      category: 'evidences',
      caseId: 'ARB-2025020032',
      caseTitle: 'Axis Bank vs. Royal Construction',
      uploadedBy: 'Priya Mehta',
      uploadedDate: '24 Feb 2025',
      size: '8.7 MB',
      tags: ['Expert', 'Technical'],
      status: 'Pending Review'
    },
    { 
      id: 'doc5', 
      name: 'Settlement Agreement Draft.docx', 
      category: 'settlements',
      caseId: 'ARB-2025020021',
      caseTitle: 'Punjab National Bank vs. Tech Innovations',
      uploadedBy: 'Amrita Desai',
      uploadedDate: '20 Feb 2025',
      size: '1.8 MB',
      tags: ['Draft', 'Settlement'],
      status: 'Pending Signature'
    },
    { 
      id: 'doc6', 
      name: 'Statement of Defense.pdf', 
      category: 'pleadings',
      caseId: 'ARB-2025020045',
      caseTitle: 'HDFC Bank vs. Sharma Enterprises',
      uploadedBy: 'Deepak Kumar',
      uploadedDate: '18 Feb 2025',
      size: '4.2 MB',
      tags: ['Important', 'Defense'],
      status: 'Verified'
    },
    { 
      id: 'doc7', 
      name: 'Hearing Transcript - Initial Hearing.pdf', 
      category: 'correspondence',
      caseId: 'ARB-2025020028',
      caseTitle: 'ICICI Bank vs. Patel Brothers',
      uploadedBy: 'System',
      uploadedDate: '15 Feb 2025',
      size: '2.3 MB',
      tags: ['Transcript', 'Hearing'],
      status: 'Verified'
    },
    { 
      id: 'doc8', 
      name: 'Final Award.pdf', 
      category: 'awards',
      caseId: 'ARB-2024110015',
      caseTitle: 'HSBC vs. Global Traders Inc.',
      uploadedBy: 'Tribunal',
      uploadedDate: '10 Feb 2025',
      size: '5.6 MB',
      tags: ['Final', 'Award'],
      status: 'Official'
    }
  ];

  // Filter documents based on selected category
  const filteredDocuments = selectedFilter === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedFilter);

  const getStatusBadgeColor = (status) => {
    const colors = {
      'Verified': 'bg-green-100 text-green-800',
      'Pending Review': 'bg-yellow-100 text-yellow-800',
      'Pending Signature': 'bg-purple-100 text-purple-800',
      'Official': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'pleadings': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'evidences': return <FileText className="w-5 h-5 text-amber-600" />;
      case 'orders': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'correspondence': return <FileText className="w-5 h-5 text-gray-600" />;
      case 'settlements': return <FileText className="w-5 h-5 text-green-600" />;
      case 'awards': return <FileText className="w-5 h-5 text-red-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Document Repository</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <GridIcon className="w-5 h-5" />
          </button>
          <a 
            href="/documents/upload" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </a>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                Filters
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </button>
            </div>
            <div className="relative">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ArrowUpDown className="w-4 h-4 mr-2 text-gray-500" />
                Sort
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-2 flex-shrink-0">
          <h2 className="font-medium text-gray-900 mb-3">Categories</h2>
          {documentCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm flex justify-between items-center ${
                selectedFilter === category.id 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center">
                {category.id === 'all' ? (
                  <FolderOpen className="w-4 h-4 mr-2" />
                ) : (
                  <Folder className="w-4 h-4 mr-2" />
                )}
                {category.name}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Documents List/Grid View */}
        <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {viewMode === 'list' ? (
            <>
              {/* Added wrapper with overflow-x-auto for responsiveness */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getCategoryIcon(doc.category)}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-xs text-gray-500">{doc.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.caseId}</div>
                          <div className="text-xs text-gray-500">{doc.caseTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.uploadedDate}</div>
                          <div className="text-xs text-gray-500">by {doc.uploadedBy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="w-5 h-5" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Showing {filteredDocuments.length} of {documentCategories.find(c => c.id === selectedFilter)?.count || documents.length} documents
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">Previous</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700">Next</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg hover:shadow-md p-4 transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        {getCategoryIcon(doc.category)}
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900 truncate max-w-xs">{doc.name}</h3>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      <p className="truncate">{doc.caseTitle}</p>
                      <p className="mt-1 flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {doc.uploadedBy}
                      </p>
                      <p className="mt-1 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {doc.uploadedDate}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-full">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded-full">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
