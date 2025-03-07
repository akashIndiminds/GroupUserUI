'use client';
import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, X, CheckCircle, AlertCircle, Search,
  Filter, Download, Eye, MoreHorizontal
} from 'lucide-react';

export default function UploadDocuments() {
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Initial Complaint.pdf', 
      category: 'Complaint', 
      size: '2.4 MB', 
      uploadedBy: 'John Smith', 
      date: '2025-01-15', 
      status: 'Verified' 
    },
    { 
      id: 2, 
      name: 'Response Letter.docx', 
      category: 'Response', 
      size: '1.8 MB', 
      uploadedBy: 'Priya Sharma', 
      date: '2025-01-28', 
      status: 'Verified' 
    },
    { 
      id: 3, 
      name: 'Bank Statement Q4 2024.xlsx', 
      category: 'Evidence', 
      size: '3.7 MB', 
      uploadedBy: 'John Smith', 
      date: '2025-02-10', 
      status: 'Processing' 
    }
  ]);
  
  const [uploadProgress, setUploadProgress] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDropdown, setShowDropdown] = useState(null);
  const fileInputRef = useRef(null);
  
  const documentCategories = [
    'All',
    'Complaint',
    'Response',
    'Evidence',
    'Contract',
    'Communication',
    'Court Order',
    'Legal Notice',
    'Witness Statement'
  ];
  
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create upload progress entries
    const newProgress = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      progress: 0,
      size: formatFileSize(file.size),
      status: 'Uploading'
    }));
    
    setUploadProgress([...uploadProgress, ...newProgress]);
    
    // Simulate upload progress
    newProgress.forEach((item, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // After "upload" completes, add to documents and remove from progress
          setTimeout(() => {
            const newDoc = {
              id: item.id,
              name: item.name,
              category: 'Uncategorized',
              size: item.size,
              uploadedBy: 'Current User',
              date: new Date().toISOString().split('T')[0],
              status: 'Processing'
            };
            
            setDocuments(prev => [...prev, newDoc]);
            setUploadProgress(prev => prev.filter(p => p.id !== item.id));
          }, 1000);
        }
        
        setUploadProgress(prev => 
          prev.map(p => 
            p.id === item.id ? { ...p, progress } : p
          )
        );
      }, 300);
    });
    
    // Reset file input
    e.target.value = null;
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };
  
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const toggleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };
  
  const handleCategoryChange = (docId, category) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, category } : doc
    ));
    setShowDropdown(null);
  };
  
  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Processing':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'Rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Document Repository</h2>
      </div>
      
      <div className="px-6 py-6">
        <div 
          className="max-w-full flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                <span>Upload files</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  multiple 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG up to 10MB each
            </p>
          </div>
        </div>
        
        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Uploading...</h3>
            <div className="space-y-3">
              {uploadProgress.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.size}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{item.progress}% completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {documentCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Document List */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Document Library</h3>
          
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Upload a document to get started.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(doc.status)}
                          <span className="ml-1.5 text-sm text-gray-500">{doc.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            title="Download"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                          <div className="relative">
                            <button 
                              className="text-gray-400 hover:text-gray-500"
                              title="More options"
                              onClick={() => toggleDropdown(doc.id)}
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                            {showDropdown === doc.id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1">
                                  <div className="px-4 py-2 text-xs text-gray-500">
                                    Change Category
                                  </div>
                                  {documentCategories.filter(c => c !== 'All').map((category) => (
                                    <button
                                      key={category}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onClick={() => handleCategoryChange(doc.id, category)}
                                    >
                                      {category}
                                    </button>
                                  ))}
                                  <div className="border-t border-gray-100"></div>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={() => handleRemoveDocument(doc.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}