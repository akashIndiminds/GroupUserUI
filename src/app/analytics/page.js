'use client';
import React, { useState } from 'react';
import { 
  BarChart, LineChart, PieChart, Download, Filter,
  Calendar, Clock, ChevronDown, RefreshCw, ArrowUpRight,
  FileText, Users, Briefcase, AlertCircle, CheckCircle
} from 'lucide-react';

export default function AnalyticsView() {
  const [timeRange, setTimeRange] = useState('last30Days');
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock analytics data
  const analyticsData = {
    caseMetrics: {
      totalCases: 248,
      activeCases: 182,
      resolvedCases: 66,
      avgResolutionTime: '47 days',
      growthRate: '+12%'
    },
    caseTypes: [
      { type: 'Banking Disputes', count: 98, percentage: 39.5 },
      { type: 'Commercial Contracts', count: 76, percentage: 30.6 },
      { type: 'Intellectual Property', count: 42, percentage: 16.9 },
      { type: 'Employment Disputes', count: 32, percentage: 12.9 }
    ],
    resolutionTimeframes: [
      { range: '< 30 days', count: 18, percentage: 27.3 },
      { range: '30-60 days', count: 32, percentage: 48.5 },
      { range: '60-90 days', count: 12, percentage: 18.2 },
      { range: '> 90 days', count: 4, percentage: 6.1 }
    ],
    documentMetrics: {
      totalDocuments: 1458,
      documentsThisMonth: 183,
      topDocumentTypes: [
        { type: 'Statements', count: 362, percentage: 24.8 },
        { type: 'Contracts', count: 289, percentage: 19.8 },
        { type: 'Evidence', count: 253, percentage: 17.4 },
        { type: 'Correspondence', count: 197, percentage: 13.5 },
        { type: 'Legal Opinions', count: 165, percentage: 11.3 },
        { type: 'Other', count: 192, percentage: 13.2 }
      ]
    },
    monthlyTrends: [
      { month: 'Oct 2024', newCases: 32, resolvedCases: 18 },
      { month: 'Nov 2024', newCases: 36, resolvedCases: 22 },
      { month: 'Dec 2024', newCases: 28, resolvedCases: 30 },
      { month: 'Jan 2025', newCases: 42, resolvedCases: 25 },
      { month: 'Feb 2025', newCases: 38, resolvedCases: 31 },
      { month: 'Mar 2025', newCases: 45, resolvedCases: 28 }
    ]
  };

  const renderKpiCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cases</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{analyticsData.caseMetrics.totalCases}</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-md">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              {analyticsData.caseMetrics.growthRate}
              <ArrowUpRight className="w-4 h-4 ml-0.5" />
            </span>
            <span className="text-gray-500 ml-2">vs previous period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Cases</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{analyticsData.caseMetrics.activeCases}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-md">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">
              {Math.round((analyticsData.caseMetrics.activeCases / analyticsData.caseMetrics.totalCases) * 100)}% of total
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved Cases</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{analyticsData.caseMetrics.resolvedCases}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-md">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">
              {Math.round((analyticsData.caseMetrics.resolvedCases / analyticsData.caseMetrics.totalCases) * 100)}% resolution rate
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{analyticsData.caseMetrics.avgResolutionTime}</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-md">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">
              Based on {analyticsData.caseMetrics.resolvedCases} resolutions
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderCaseTypeDistribution = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Case Type Distribution</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Placeholder for actual chart - would use a charting library in a real implementation */}
              <div className="absolute inset-0 rounded-full border-8 border-indigo-100 bg-white"></div>
              <div className="absolute inset-0 rounded-full border-8 border-indigo-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(0 40%, 100% 40%, 100% 71%, 0 71%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-teal-500" style={{ clipPath: 'polygon(0 71%, 100% 71%, 100% 88%, 0 88%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(0 88%, 100% 88%, 100% 100%, 0 100%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-900">{analyticsData.caseMetrics.totalCases}</span>
                <span className="text-sm text-gray-500">Total Cases</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-3">
            <div className="space-y-4">
              {analyticsData.caseTypes.map((caseType, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded-sm mr-3" style={{ backgroundColor: index === 0 ? '#6366F1' : index === 1 ? '#3B82F6' : index === 2 ? '#14B8A6' : '#A855F7' }}></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{caseType.type}</span>
                      <span className="text-sm text-gray-500">{caseType.count} ({caseType.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ 
                        width: `${caseType.percentage}%`,
                        backgroundColor: index === 0 ? '#6366F1' : index === 1 ? '#3B82F6' : index === 2 ? '#14B8A6' : '#A855F7'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setSelectedReport('caseTypes')}
              >
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResolutionTimeframes = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Resolution Timeframes</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              {analyticsData.resolutionTimeframes.map((timeframe, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded-sm mr-3" style={{ backgroundColor: index === 0 ? '#10B981' : index === 1 ? '#6366F1' : index === 2 ? '#F59E0B' : '#EF4444' }}></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{timeframe.range}</span>
                      <span className="text-sm text-gray-500">{timeframe.count} cases ({timeframe.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ 
                        width: `${timeframe.percentage}%`,
                        backgroundColor: index === 0 ? '#10B981' : index === 1 ? '#6366F1' : index === 2 ? '#F59E0B' : '#EF4444'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                Average resolution time: {analyticsData.caseMetrics.avgResolutionTime}
              </div>
              <button 
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setSelectedReport('resolutionTimeframes')}
              >
                View Detailed Report
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Placeholder for actual chart */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-100 bg-white"></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 27%, 0 27%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-indigo-500" style={{ clipPath: 'polygon(0 27%, 100% 27%, 100% 76%, 0 76%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: 'polygon(0 76%, 100% 76%, 100% 94%, 0 94%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{ clipPath: 'polygon(0 94%, 100% 94%, 100% 100%, 0 100%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-900">{analyticsData.caseMetrics.resolvedCases}</span>
                <span className="text-sm text-gray-500">Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentMetrics = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Document Metrics</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-500">Total Documents</p>
                <h3 className="mt-1 text-2xl font-semibold text-gray-900">{analyticsData.documentMetrics.totalDocuments}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium text-green-600">+{analyticsData.documentMetrics.documentsThisMonth}</span> this month
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setSelectedReport('documentMetrics')}
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Document Type Distribution</h4>
            <div className="space-y-3">
              {analyticsData.documentMetrics.topDocumentTypes.map((docType, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-sm mr-2" style={{ 
                    backgroundColor: 
                      index === 0 ? '#6366F1' : 
                      index === 1 ? '#3B82F6' : 
                      index === 2 ? '#14B8A6' : 
                      index === 3 ? '#8B5CF6' : 
                      index === 4 ? '#F59E0B' : 
                      '#9CA3AF'
                  }}></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-900">{docType.type}</span>
                      <span className="text-xs text-gray-500">{docType.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ 
                        width: `${docType.percentage}%`,
                        backgroundColor: 
                          index === 0 ? '#6366F1' : 
                          index === 1 ? '#3B82F6' : 
                          index === 2 ? '#14B8A6' : 
                          index === 3 ? '#8B5CF6' : 
                          index === 4 ? '#F59E0B' : 
                          '#9CA3AF'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyTrends = () => {
    const maxCases = Math.max(
      ...analyticsData.monthlyTrends.map(m => Math.max(m.newCases, m.resolvedCases))
    );
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-64">
          {/* Chart placeholder - would use a proper chart library in real implementation */}
          <div className="h-full flex items-end">
            {analyticsData.monthlyTrends.map((month, index) => (
              <div key={index} className="flex-1 flex items-end justify-center space-x-1">
                <div 
                  className="w-5 bg-blue-500 rounded-t"
                  style={{ height: `${(month.newCases / maxCases) * 100}%` }}
                ></div>
                <div 
                  className="w-5 bg-green-500 rounded-t"
                  style={{ height: `${(month.resolvedCases / maxCases) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-6 mt-2">
          {analyticsData.monthlyTrends.map((month, index) => (
            <div key={index} className="text-xs text-center text-gray-500">
              {month.month}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-xs text-gray-600">New Cases</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-xs text-gray-600">Resolved Cases</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <button 
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setSelectedReport('monthlyTrends')}
          >
            View Detailed Trends
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-500 mt-1">Insights and metrics for your ODR platform</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              {timeRange === 'last30Days' ? 'Last 30 Days' : 
               timeRange === 'lastQuarter' ? 'Last Quarter' : 
               timeRange === 'lastYear' ? 'Last Year' : 'Custom Range'}
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </button>
            {/* Dropdown menu would go here */}
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            Filters
          </button>
          
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <RefreshCw className="w-4 h-4 mr-1 text-gray-400" />
        Last updated: March 7, 2025, 09:15 AM
      </div>
      
      {renderKpiCards()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderCaseTypeDistribution()}
        {renderResolutionTimeframes()}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {renderDocumentMetrics()}
        <div className="lg:col-span-2">
          {renderMonthlyTrends()}
        </div>
      </div>
    </div>
  );
}