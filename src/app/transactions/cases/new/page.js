'use client';
import React, { useState } from 'react';
import { 
  ChevronRight, Upload, X, Info, AlertCircle, Check, 
  ChevronDown, Calendar, ChevronLeft, Users
} from 'lucide-react';

export default function CreateNewCase() {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseData, setCaseData] = useState({
    caseTitle: '',
    caseType: '',
    description: '',
    claimantInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    respondentInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    disputeValue: '',
    disputeCurrency: 'INR',
    documents: []
  });
  
  const [errors, setErrors] = useState({});
  const caseTypes = [
    'Banking Dispute',
    'Commercial Contract',
    'Intellectual Property',
    'Employment Dispute',
    'Construction Dispute',
    'Corporate Dispute',
    'Insurance Claim'
  ];

  const updateCaseData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCaseData({
        ...caseData,
        [parent]: {
          ...caseData[parent],
          [child]: value
        }
      });
    } else {
      setCaseData({
        ...caseData,
        [field]: value
      });
    }
    
    // Clear error for the field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };
  
  const validateStep = (step) => {
    let newErrors = {};
    let isValid = true;
    
    if (step === 1) {
      if (!caseData.caseTitle.trim()) {
        newErrors.caseTitle = 'Case title is required';
        isValid = false;
      }
      
      if (!caseData.caseType) {
        newErrors.caseType = 'Please select a case type';
        isValid = false;
      }
      
      if (!caseData.description.trim()) {
        newErrors.description = 'Description is required';
        isValid = false;
      } else if (caseData.description.trim().length < 50) {
        newErrors.description = 'Description should be at least 50 characters';
        isValid = false;
      }
    }
    
    if (step === 2) {
      // Validate claimant info
      if (!caseData.claimantInfo.name.trim()) {
        newErrors['claimantInfo.name'] = 'Claimant name is required';
        isValid = false;
      }
      
      if (!caseData.claimantInfo.email.trim()) {
        newErrors['claimantInfo.email'] = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(caseData.claimantInfo.email)) {
        newErrors['claimantInfo.email'] = 'Invalid email format';
        isValid = false;
      }
      
      // Validate respondent info
      if (!caseData.respondentInfo.name.trim()) {
        newErrors['respondentInfo.name'] = 'Respondent name is required';
        isValid = false;
      }
      
      if (!caseData.respondentInfo.email.trim()) {
        newErrors['respondentInfo.email'] = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(caseData.respondentInfo.email)) {
        newErrors['respondentInfo.email'] = 'Invalid email format';
        isValid = false;
      }
    }
    
    if (step === 3) {
      if (!caseData.disputeValue) {
        newErrors.disputeValue = 'Dispute value is required';
        isValid = false;
      } else if (isNaN(caseData.disputeValue) || Number(caseData.disputeValue) <= 0) {
        newErrors.disputeValue = 'Please enter a valid positive number';
        isValid = false;
      }
      
      if (caseData.documents.length === 0) {
        newErrors.documents = 'At least one document is required';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }));
    
    setCaseData({
      ...caseData,
      documents: [...caseData.documents, ...newDocuments]
    });
  };
  
  const removeDocument = (index) => {
    const updatedDocuments = [...caseData.documents];
    updatedDocuments.splice(index, 1);
    setCaseData({
      ...caseData,
      documents: updatedDocuments
    });
  };
  
  const submitCase = () => {
    if (validateStep(3)) {
      // Here you would submit the case data to your backend API
      console.log('Case data submitted:', caseData);
      // Redirect to case confirmation page or dashboard
      alert('Case created successfully!');
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              <span>1</span>
            </div>
            <span className="text-sm mt-1">Case Details</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              <span>2</span>
            </div>
            <span className="text-sm mt-1">Parties</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: currentStep >= 3 ? '100%' : '0%' }}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              <span>3</span>
            </div>
            <span className="text-sm mt-1">Documents</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderStepOne = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Case Title *</label>
          <input
            type="text"
            className={`mt-1 block w-full px-3 py-2 border ${errors.caseTitle ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            value={caseData.caseTitle}
            onChange={(e) => updateCaseData('caseTitle', e.target.value)}
            placeholder="Enter a descriptive title for your case"
          />
          {errors.caseTitle && <p className="mt-1 text-sm text-red-600">{errors.caseTitle}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Case Type *</label>
          <div className="relative mt-1">
            <select
              className={`block w-full px-3 py-2 border ${errors.caseType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={caseData.caseType}
              onChange={(e) => updateCaseData('caseType', e.target.value)}
            >
              <option value="">Select a case type</option>
              {caseTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.caseType && <p className="mt-1 text-sm text-red-600">{errors.caseType}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            rows="4"
            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            value={caseData.description}
            onChange={(e) => updateCaseData('description', e.target.value)}
            placeholder="Provide a detailed description of the dispute (minimum 50 characters)"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            {caseData.description.length}/500 characters
          </p>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
      </div>
    );
  };
  
  const renderStepTwo = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Party Information</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Both parties will be notified automatically once the case is created.</p>
              </div>
            </div>
          </div>
        </div>
      
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Claimant Information
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${errors['claimantInfo.name'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                value={caseData.claimantInfo.name}
                onChange={(e) => updateCaseData('claimantInfo.name', e.target.value)}
              />
              {errors['claimantInfo.name'] && <p className="mt-1 text-sm text-red-600">{errors['claimantInfo.name']}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                className={`mt-1 block w-full px-3 py-2 border ${errors['claimantInfo.email'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                value={caseData.claimantInfo.email}
                onChange={(e) => updateCaseData('claimantInfo.email', e.target.value)}
              />
              {errors['claimantInfo.email'] && <p className="mt-1 text-sm text-red-600">{errors['claimantInfo.email']}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={caseData.claimantInfo.phone}
                onChange={(e) => updateCaseData('claimantInfo.phone', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={caseData.claimantInfo.address}
                onChange={(e) => updateCaseData('claimantInfo.address', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Respondent Information
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${errors['respondentInfo.name'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                value={caseData.respondentInfo.name}
                onChange={(e) => updateCaseData('respondentInfo.name', e.target.value)}
              />
              {errors['respondentInfo.name'] && <p className="mt-1 text-sm text-red-600">{errors['respondentInfo.name']}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                className={`mt-1 block w-full px-3 py-2 border ${errors['respondentInfo.email'] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                value={caseData.respondentInfo.email}
                onChange={(e) => updateCaseData('respondentInfo.email', e.target.value)}
              />
              {errors['respondentInfo.email'] && <p className="mt-1 text-sm text-red-600">{errors['respondentInfo.email']}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={caseData.respondentInfo.phone}
                onChange={(e) => updateCaseData('respondentInfo.phone', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={caseData.respondentInfo.address}
                onChange={(e) => updateCaseData('respondentInfo.address', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderStepThree = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dispute Value *</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="text"
              className={`block w-full pl-7 pr-12 py-2 border ${errors.disputeValue ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="0.00"
              value={caseData.disputeValue}
              onChange={(e) => updateCaseData('disputeValue', e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                value={caseData.disputeCurrency}
                onChange={(e) => updateCaseData('disputeCurrency', e.target.value)}
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
          {errors.disputeValue && <p className="mt-1 text-sm text-red-600">{errors.disputeValue}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Supporting Documents *</label>
          <div className="mt-2">
            <div 
              className={`max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${errors.documents ? 'border-red-500' : 'border-gray-300'}`}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label 
                    htmlFor="file-upload" 
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      multiple 
                      onChange={handleFileUpload} 
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, XLS, XLSX up to 10MB each
                </p>
              </div>
            </div>
            {errors.documents && <p className="mt-1 text-sm text-red-600">{errors.documents}</p>}
          </div>
        </div>
        
        {caseData.documents.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents</h4>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
              {caseData.documents.map((doc, index) => (
                <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <span className="ml-2 flex-1 w-0 truncate">{doc.name}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center">
                    <button
                      type="button"
                      className="font-medium text-red-600 hover:text-red-500"
                      onClick={() => removeDocument(index)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="bg-yellow-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>By submitting this case, you confirm that all information provided is accurate to the best of your knowledge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Create New Case</h2>
      </div>
      
      <div className="px-6 py-6">
        {renderStepIndicator()}
        
        <form>
          {currentStep === 1 && renderStepOne()}
          {currentStep === 2 && renderStepTwo()}
          {currentStep === 3 && renderStepThree()}
          
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={prevStep}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={nextStep}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={submitCase}
              >
                <Check className="mr-2 h-4 w-4" />
                Submit Case
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}