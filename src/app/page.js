'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { 
  Briefcase, Users, FileText, Check, Clock, AlertTriangle, Calendar, 
  ChevronRight, BarChart3, Award, Gavel, Database, PieChart, Scale,
  Bell, Bookmark, Download, CheckCircle, ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();

  // Dashboard statistics (simulate API calls in a real app)
  const stats = {
    totalCases: 142,
    pendingCases: 87,
    closedCases: 55,
    documentsUploaded: 643,
    upcomingHearings: 12,
    tasksOverdue: 8,
    settledCases: 42,
    successRate: 78
  };

  const recentCases = [
    { id: 'ARB-2025020045', title: 'HDFC Bank vs. Sharma Enterprises', status: 'In Progress', type: 'Banking', date: '02 Mar 2025' },
    { id: 'ARB-2025020039', title: 'SBI vs. Modern Solutions Ltd.', status: 'Scheduled', type: 'Commercial', date: '28 Feb 2025' },
    { id: 'ARB-2025020032', title: 'Axis Bank vs. Royal Construction', status: 'Pending', type: 'Construction', date: '25 Feb 2025' },
    { id: 'ARB-2025020028', title: 'ICICI Bank vs. Patel Brothers', status: 'In Progress', type: 'Partnership', date: '23 Feb 2025' },
    { id: 'ARB-2025020021', title: 'Punjab National Bank vs. Tech Innovations', status: 'Settled', type: 'IP Dispute', date: '20 Feb 2025' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Initial Hearing: HDFC Bank vs. Sharma Enterprises', date: '10 Mar 2025', time: '10:00 AM', type: 'Hearing' },
    { id: 2, title: 'Document Submission Deadline: SBI vs. Modern Solutions', date: '12 Mar 2025', time: '05:00 PM', type: 'Deadline' },
    { id: 3, title: 'Mediation Session: Axis Bank vs. Royal Construction', date: '15 Mar 2025', time: '02:30 PM', type: 'Mediation' },
    { id: 4, title: 'Expert Witness Testimony: ICICI vs. Patel Bros', date: '18 Mar 2025', time: '11:00 AM', type: 'Testimony' }
  ];

  const notifications = [
    { id: 1, text: 'New document uploaded in case ARB-2025020045', time: '35 minutes ago', read: false },
    { id: 2, text: 'Hearing scheduled for SBI vs. Modern Solutions Ltd.', time: '2 hours ago', read: false },
    { id: 3, text: 'Deadline reminder: Document submission for case ARB-2025020032', time: '5 hours ago', read: true }
  ];

  // Status badge styles helper function
  const getStatusStyles = (status) => {
    const styles = {
      'In Progress': 'bg-blue-100 text-blue-800',
      'Scheduled': 'bg-purple-100 text-purple-800',
      'Pending': 'bg-amber-100 text-amber-800',
      'Settled': 'bg-green-100 text-green-800',
      'Closed': 'bg-gray-100 text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  // Event type badge styles helper function
  const getEventTypeStyles = (type) => {
    const styles = {
      'Hearing': 'bg-indigo-100 text-indigo-800',
      'Deadline': 'bg-red-100 text-red-800',
      'Mediation': 'bg-teal-100 text-teal-800',
      'Testimony': 'bg-orange-100 text-orange-800'
    };
    return styles[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Arbitration Dashboard</h1>
        <div className="flex space-x-2 items-center">
       
        
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

        {/* Success Rate Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 bg-purple-50 rounded-md">
                <Award className="w-5 h-5 text-purple-700" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.successRate}%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                <span>{stats.settledCases} settled cases</span>
              </div>
              <div>
                <span>Last 6 months</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-2">
            <a href="/analytics" className="text-sm text-blue-700 font-medium flex items-center hover:text-blue-800">
              View analytics
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Cases */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm lg:col-span-2">
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusStyles(caseItem.status)}`}>
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
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Showing 5 of {stats.totalCases} cases</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <a href="/notifications" className="text-sm text-blue-700 font-medium hover:text-blue-800">
              View All
            </a>
          </div>
          <div className="p-4">
            {notifications.length === 0 ? (
              <div className="text-center py-6">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 ${notification.read ? 'bg-white' : 'bg-blue-50'} rounded-lg border ${notification.read ? 'border-gray-200' : 'border-blue-200'}`}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-900 font-medium">{notification.text}</p>
                      {!notification.read && (
                        <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Quick Actions */}
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
                  <BarChart3 className="w-5 h-5 text-amber-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">View Reports</span>
              </a>
              <a href="/schedule" className="group flex flex-col items-center justify-center text-center p-4 border border-gray-200 rounded-md hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="p-2 bg-purple-50 rounded-full group-hover:bg-purple-100">
                  <Calendar className="w-5 h-5 text-purple-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">Schedule Hearing</span>
              </a>
              <a href="/templates" className="group flex flex-col items-center justify-center text-center p-4 border border-gray-200 rounded-md hover:border-teal-300 hover:bg-teal-50 transition-colors">
                <div className="p-2 bg-teal-50 rounded-full group-hover:bg-teal-100">
                  <Gavel className="w-5 h-5 text-teal-700" />
                </div>
                <span className="mt-2 font-medium text-sm text-gray-900">Document Templates</span>
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Schedule</h2>
            <a href="/schedule" className="text-sm text-blue-700 font-medium hover:text-blue-800">
              Full Calendar
            </a>
          </div>
          <div className="p-5">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-md hover:border-blue-200 hover:bg-blue-50 transition-colors">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-indigo-50 rounded-md flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-bold text-indigo-700">{event.date.split(' ')[0]}</span>
                        <span className="text-xs text-indigo-600">{event.date.split(' ')[1]}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${getEventTypeStyles(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      <a href={`/schedule/${event.id}`} className="text-blue-700 hover:text-blue-900">
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No upcoming events scheduled
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
          <a href="/analytics" className="text-sm text-blue-700 font-medium hover:text-blue-800">
            Detailed Analytics
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex flex-col items-center justify-center text-center">
            <PieChart className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-sm font-semibold text-gray-900">Case Type Distribution</h3>
            <p className="text-xs text-gray-500 mt-1">Analysis of case categories</p>
            <a href="/analytics/case-types" className="mt-3 text-xs text-blue-700">View Report</a>
          </div>
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex flex-col items-center justify-center text-center">
            <Scale className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-sm font-semibold text-gray-900">Resolution Timeframes</h3>
            <p className="text-xs text-gray-500 mt-1">Average time to settlement</p>
            <a href="/analytics/timeframes" className="mt-3 text-xs text-blue-700">View Report</a>
          </div>
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex flex-col items-center justify-center text-center">
            <Database className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="text-sm font-semibold text-gray-900">Document Metrics</h3>
            <p className="text-xs text-gray-500 mt-1">Document usage statistics</p>
            <a href="/analytics/documents" className="mt-3 text-xs text-blue-700">View Report</a>
          </div>
        </div>
      </div>

      {/* Recent Downloads or Activity */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-md mr-4">
                <Download className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Case Summary Report Downloaded</p>
                <p className="text-xs text-gray-500">ARB-2025020045 - HDFC Bank vs. Sharma Enterprises</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Today, 09:45 AM</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-md mr-4">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Settlement Agreement Uploaded</p>
                <p className="text-xs text-gray-500">ARB-2025020021 - Punjab National Bank vs. Tech Innovations</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Yesterday, 04:20 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-md mr-4">
                <Bookmark className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New Case Created</p>
                <p className="text-xs text-gray-500">ARB-2025020045 - HDFC Bank vs. Sharma Enterprises</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">02 Mar 2025, 10:30 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}