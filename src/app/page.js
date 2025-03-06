'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Briefcase, Users, FileText, Check, Clock, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();

  // Dashboard statistics (simulate API calls in a real app)
  const stats = {
    totalCases: 142,
    pendingCases: 87,
    closedCases: 55,
    documentsUploaded: 643,
    upcomingHearings: 12,
    tasksOverdue: 8
  };

  const recentCases = [
    { id: 'ARB-2025020045', title: 'HDFC Bank vs. Sharma Enterprises', status: 'In Progress', date: '02 Mar 2025' },
    { id: 'ARB-2025020039', title: 'SBI vs. Modern Solutions Ltd.', status: 'Scheduled', date: '28 Feb 2025' },
    { id: 'ARB-2025020032', title: 'Axis Bank vs. Royal Construction', status: 'Pending', date: '25 Feb 2025' },
    { id: 'ARB-2025020028', title: 'ICICI Bank vs. Patel Brothers', status: 'In Progress', date: '23 Feb 2025' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">Arbitration Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Cases Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 bg-blue-50 rounded-md">
                <Briefcase className="w-5 h-5 text-blue-700" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Cases</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCases}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-green-600" />
                <span>{stats.closedCases} closed</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-amber-600" />
                <span>{stats.pendingCases} pending</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-2">
            <a href="/transactions/cases" className="text-sm text-blue-700 font-medium flex items-center hover:text-blue-800">
              View all cases
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Documents Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 bg-green-50 rounded-md">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.documentsUploaded}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span>Total documents across all arbitration cases</span>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-2">
            <a href="/documents" className="text-sm text-blue-700 font-medium flex items-center hover:text-blue-800">
              Document repository
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Upcoming Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 bg-indigo-50 rounded-md">
                <Calendar className="w-5 h-5 text-indigo-700" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Upcoming Hearings</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingHearings}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div>
                <span>Next 30 days</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />
                <span>{stats.tasksOverdue} overdue tasks</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-2">
            <a href="/schedule" className="text-sm text-blue-700 font-medium flex items-center hover:text-blue-800">
              View schedule
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Arbitration Cases</h2>
          <a href="/transactions/cases" className="text-sm text-blue-700 font-medium hover:text-blue-800">
            View All Cases
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{caseItem.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caseItem.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      caseItem.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : caseItem.status === 'Scheduled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`/transactions/cases/${caseItem.id}`} className="text-blue-700 hover:text-blue-900">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions & Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <a href="/transactions/cases/new" className="group flex flex-col items-center justify-center text-center p-4 border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100">
                  <Briefcase className="w-5 h-5 text-blue-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">Create New Case</span>
              </a>
              <a href="/documents/upload" className="group flex flex-col items-center justify-center text-center p-4 border border-gray-200 rounded-md hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="p-2 bg-green-50 rounded-full group-hover:bg-green-100">
                  <FileText className="w-5 h-5 text-green-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">Upload Documents</span>
              </a>
              <a href="/transactions/tasks" className="group flex flex-col items-center justify-center text-center p-4 border border-gray-200 rounded-md hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                <div className="p-2 bg-indigo-50 rounded-full group-hover:bg-indigo-100">
                  <Check className="w-5 h-5 text-indigo-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">Manage Tasks</span>
              </a>
              <a href="/reports/cases" className="group flex flex-col items-center justify-center text-center p-4 border border-gray-200 rounded-md hover:border-amber-300 hover:bg-amber-50 transition-colors">
                <div className="p-2 bg-amber-50 rounded-full group-hover:bg-amber-100">
                  <Users className="w-5 h-5 text-amber-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">View Reports</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Schedule</h2>
            <a href="/schedule" className="text-sm text-blue-700 font-medium hover:text-blue-800">
              Full Calendar
            </a>
          </div>
          <div className="p-5">
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Calendar view will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}