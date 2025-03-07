'use client';
import React, { useState } from 'react';
import { 
  Calendar, Clock, ArrowLeft, ArrowRight, ChevronDown, 
  Filter, Plus, Users, MapPin, Info, Clipboard, Video, 
  AlertTriangle, CheckCircle, FileText
} from 'lucide-react';

export default function ScheduleView() {
  const [currentView, setCurrentView] = useState('month'); // 'month', 'week', 'day', 'list'
  const [currentMonth, setCurrentMonth] = useState('March 2025');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock schedule data
  const events = [
    {
      id: 1,
      title: 'Initial Hearing: HDFC Bank vs. Sharma Enterprises',
      caseId: 'ARB-2025020045',
      date: '2025-03-10',
      time: '10:00 AM - 12:00 PM',
      type: 'Hearing',
      location: 'Virtual Hearing Room 1',
      participants: ['Arbitrator: Justice R.K. Malhotra', 'Claimant: HDFC Bank', 'Respondent: Sharma Enterprises'],
      status: 'Upcoming',
      description: 'Initial procedural hearing to establish timeline and requirements for the arbitration proceeding.',
      documents: ['Procedural Order', 'Hearing Agenda']
    },
    {
      id: 2,
      title: 'Document Submission Deadline: SBI vs. Modern Solutions',
      caseId: 'ARB-2025020039',
      date: '2025-03-12',
      time: '05:00 PM',
      type: 'Deadline',
      status: 'Upcoming',
      description: 'Deadline for submission of all documentary evidence from both parties.',
      documents: ['Evidence Checklist', 'Submission Guidelines']
    },
    {
      id: 3,
      title: 'Mediation Session: Axis Bank vs. Royal Construction',
      caseId: 'ARB-2025020032',
      date: '2025-03-15',
      time: '02:30 PM - 04:30 PM',
      type: 'Mediation',
      location: 'Physical Room 204, ODR Center',
      participants: ['Mediator: Dr. Anjali Kumar', 'Claimant: Axis Bank', 'Respondent: Royal Construction'],
      status: 'Upcoming',
      description: 'Voluntary mediation session to explore possible settlement options.',
      documents: ['Mediation Agreement', 'Issues Statement']
    },
    {
      id: 4,
      title: 'Expert Witness Testimony: ICICI vs. Patel Bros',
      caseId: 'ARB-2025020028',
      date: '2025-03-18',
      time: '11:00 AM - 02:00 PM',
      type: 'Testimony',
      location: 'Virtual Hearing Room 3',
      participants: ['Arbitrator: Justice P.N. Bhagwati', 'Expert: Dr. Rajesh Shah', 'Claimant: ICICI Bank', 'Respondent: Patel Brothers'],
      status: 'Upcoming',
      description: 'Expert witness testimony on financial valuation matters.',
      documents: ['Expert Report', 'Curriculum Vitae', 'Evidence Bundle']
    },
    {
      id: 5,
      title: 'Pre-hearing Conference: Yes Bank vs. Premier Industries',
      caseId: 'ARB-2025020017',
      date: '2025-03-22',
      time: '09:30 AM - 11:00 AM',
      type: 'Conference',
      location: 'Virtual Hearing Room 2',
      participants: ['Arbitrator: Justice M.S. Menon', 'Claimant: Yes Bank', 'Respondent: Premier Industries'],
      status: 'Upcoming',
      description: 'Pre-hearing conference to address procedural issues.',
      documents: ['Procedural Agenda', 'Issues List']
    },
    {
      id: 6,
      title: 'Final Award Issuance: Kotak Bank vs. Sunrise Exports',
      caseId: 'ARB-2024110008',
      date: '2025-03-25',
      time: '04:00 PM',
      type: 'Award',
      status: 'Upcoming',
      description: 'Issuance of final arbitral award.',
      documents: ['Award Notification']
    }
  ];

  // Event type badge styles helper function
  const getEventTypeStyles = (type) => {
    const styles = {
      'Hearing': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Deadline': 'bg-red-100 text-red-800 border-red-200',
      'Mediation': 'bg-teal-100 text-teal-800 border-teal-200',
      'Testimony': 'bg-orange-100 text-orange-800 border-orange-200',
      'Conference': 'bg-purple-100 text-purple-800 border-purple-200',
      'Award': 'bg-green-100 text-green-800 border-green-200'
    };
    return styles[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'Hearing': return <Users className="w-4 h-4" />;
      case 'Deadline': return <Clock className="w-4 h-4" />;
      case 'Mediation': return <Users className="w-4 h-4" />;
      case 'Testimony': return <Clipboard className="w-4 h-4" />;
      case 'Conference': return <Video className="w-4 h-4" />;
      case 'Award': return <FileText className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const getNavigation = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <div className="ml-6 flex space-x-2">
            <button 
              onClick={() => setCurrentView('month')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setCurrentView('week')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setCurrentView('day')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'day' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
            <button 
              onClick={() => setCurrentView('list')} 
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              List
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-gray-900 font-medium">{currentMonth}</span>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
            Today
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    // Simplified calendar for demo purposes
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {dayNames.map(day => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Add empty cells for proper month start - assuming March 2025 starts on Saturday */}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`empty-${i}`} className="bg-white p-2 h-32">
              <div className="text-gray-400 text-sm">-</div>
            </div>
          ))}
          
          {days.map(day => {
            const dateStr = `2025-03-${day.toString().padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday = day === 10; // Assuming today is March 10, 2025
            
            return (
              <div 
                key={day} 
                className={`bg-white p-2 h-32 ${isToday ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setCurrentView('day');
                }}
              >
                <div className={`${isToday ? 'text-blue-700 font-semibold' : 'text-gray-700'} flex justify-between items-center`}>
                  <span>{day}</span>
                  {dayEvents.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5">
                      {dayEvents.length}
                    </span>
                  )}
                </div>
                <div className="mt-1 space-y-1 max-h-28 overflow-y-auto">
                  {dayEvents.slice(0, 2).map(event => (
                    <div 
                      key={event.id} 
                      className={`text-xs p-1 rounded border ${getEventTypeStyles(event.type)} truncate cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                    >
                      <div className="flex items-center">
                        {getEventTypeIcon(event.type)}
                        <span className="ml-1 truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 pl-1">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayDates = [9, 10, 11, 12, 13, 14, 15]; // Assuming week of March 10-16, 2025
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 border-r"></div>
          {days.map((day, index) => {
            const dateStr = `2025-03-${dayDates[index].toString().padStart(2, '0')}`;
            const isToday = dayDates[index] === 10;
            return (
              <div key={day} className={`p-2 text-center border-r ${isToday ? 'bg-blue-50' : ''}`}>
                <div className="text-sm font-medium text-gray-500">{day}</div>
                <div className={`text-base ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-900'}`}>
                  {dayDates[index]}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="overflow-y-auto" style={{ height: '600px' }}>
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b">
              <div className="p-2 border-r text-right text-sm text-gray-500">
                {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 ? 'am' : 'pm'}
              </div>
              
              {days.map((_, dayIndex) => {
                const dateStr = `2025-03-${dayDates[dayIndex].toString().padStart(2, '0')}`;
                const timeStart = `${hour}:00`;
                const timeEnd = `${hour + 1}:00`;
                const hourEvents = events.filter(e => {
                  const eventDate = e.date;
                  if (eventDate !== dateStr) return false;
                  
                  // Simple check, can be improved for more accurate time range matching
                  const eventTimeStart = e.time.split(' - ')[0];
                  return eventTimeStart.includes(`${hour % 12}`) && 
                    ((hour < 12 && eventTimeStart.includes('AM')) || 
                     (hour >= 12 && eventTimeStart.includes('PM')));
                });
                
                return (
                  <div key={dayIndex} className="p-1 border-r relative h-16">
                    {hourEvents.map(event => (
                      <div 
                        key={event.id}
                        className={`absolute inset-x-1 p-1 rounded text-xs ${getEventTypeStyles(event.type)} cursor-pointer`}
                        style={{ top: '2px', height: 'calc(100% - 4px)' }}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="truncate">{event.time}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
    const displayDate = selectedDate || '2025-03-10';
    const dayEvents = events.filter(e => e.date === displayDate);
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {new Date(displayDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
        </div>
        
        <div className="overflow-y-auto" style={{ height: '600px' }}>
          {hours.map(hour => {
            const timeStart = `${hour}:00`;
            const timeEnd = `${hour + 1}:00`;
            const hourEvents = dayEvents.filter(e => {
              // Simple check, can be improved for more accurate time matching
              const eventTimeStart = e.time.split(' - ')[0];
              return eventTimeStart.includes(`${hour % 12}`) && 
                ((hour < 12 && eventTimeStart.includes('AM')) || 
                 (hour >= 12 && eventTimeStart.includes('PM')));
            });
            
            return (
              <div key={hour} className="flex border-b">
                <div className="p-2 w-24 flex-shrink-0 border-r text-right text-sm text-gray-500">
                  {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 ? 'am' : 'pm'}
                </div>
                <div className="flex-grow p-1 min-h-16 relative">
                  {hourEvents.map(event => (
                    <div 
                      key={event.id}
                      className={`p-2 rounded border ${getEventTypeStyles(event.type)} cursor-pointer mb-1`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                        {event.location && (
                          <>
                            <MapPin className="w-4 h-4 ml-2 mr-1" />
                            {event.location}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Schedule</h2>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1 text-sm border rounded-md text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden overflow-y-auto" style={{ maxHeight: '600px' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                
                return (
                  <tr 
                    key={event.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.caseId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeStyles(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                        <span className="ml-1">{event.type}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {event.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderEventDetails = () => {
    if (!selectedEvent) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedEvent.title}</h2>
              <button 
                onClick={() => setShowEventDetails(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-gray-500 mb-4">Case ID: {selectedEvent.caseId}</div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Date & Time</div>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    {selectedEvent.time && `, ${selectedEvent.time}`}
                  </div>
                </div>
              </div>
              
              {selectedEvent.location && (
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-500">{selectedEvent.location}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Type</div>
                  <div className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeStyles(selectedEvent.type)}`}>
                      {getEventTypeIcon(selectedEvent.type)}
                      <span className="ml-1">{selectedEvent.type}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Status</div>
                  <div className="text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {selectedEvent.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Participants</div>
                    <ul className="text-sm text-gray-500 list-disc pl-5 mt-1">
                      {selectedEvent.participants.map((participant, index) => (
                        <li key={index}>{participant}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedEvent.description && (
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Description</div>
                    <div className="text-sm text-gray-500 mt-1">{selectedEvent.description}</div>
                  </div>
                </div>
              )}
              
              {selectedEvent.documents && selectedEvent.documents.length > 0 && (
                <div className="flex items-start">
                  <Clipboard className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Documents</div>
                    <ul className="mt-1 space-y-1">
                      {selectedEvent.documents.map((doc, index) => (
                        <li key={index}>
                          <a href="#" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                            <FileText className="w-4 h-4 mr-1" />
                            {doc}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowEventDetails(false)}
              >
                Close
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Update Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {getNavigation()}
      
      <div className="mb-8">
        {currentView === 'month' && renderMonthView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'day' && renderDayView()}
        {currentView === 'list' && renderListView()}
      </div>
      
      {/* Quick view of upcoming events */}
      {currentView !== 'list' && (
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
       <div className="p-4 border-b">
         <h3 className="text-lg font-semibold text-gray-900">Upcoming Schedule</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {events.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4).map(event => {
           const eventDate = new Date(event.date);
           const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
           
           return (
             <div 
               key={event.id} 
               className="p-4 hover:bg-gray-50 cursor-pointer flex"
               onClick={() => handleEventClick(event)}
             >
               <div className="flex-shrink-0 w-12 text-center">
                 <div className="text-lg font-bold text-gray-900">{formattedDate.split(' ')[1]}</div>
                 <div className="text-sm text-gray-500">{formattedDate.split(' ')[0]}</div>
               </div>
               <div className="ml-4 flex-grow">
                 <div className="font-medium text-gray-900">{event.title}</div>
                 <div className="text-sm text-gray-500 mt-1 flex items-center">
                   <Clock className="w-4 h-4 mr-1" />
                   {event.time}
                 </div>
               </div>
               <div className="ml-4 flex-shrink-0">
                 <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getEventTypeStyles(event.type)}`}>
                   {getEventTypeIcon(event.type)}
                   <span className="ml-1">{event.type}</span>
                 </span>
               </div>
             </div>
           );
         })}
       </div>
       <div className="p-3 bg-gray-50 border-t text-center">
         <button 
           className="text-sm text-blue-600 hover:text-blue-800 font-medium"
           onClick={() => setCurrentView('list')}
         >
           View Full Calendar
         </button>
       </div>
     </div>
   )}
   
   {showEventDetails && renderEventDetails()}
 </div>
);
}