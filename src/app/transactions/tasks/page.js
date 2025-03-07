'use client';
import React, { useState } from 'react';
import { 
  Clipboard, CheckCircle, Clock, AlertTriangle, Plus, 
  Calendar, Tag, User, MoreHorizontal, ChevronDown, X
} from 'lucide-react';

export default function ManageTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review initial complaint documents',
      caseId: 'BKD-2025-0042',
      caseName: 'HDFC Bank vs. Sharma Enterprises',
      assignedTo: 'John Smith',
      dueDate: '2025-03-12',
      priority: 'High',
      status: 'In Progress',
      description: 'Review all initial complaint documents and prepare summary for the arbitrator.'
    },
    {
      id: 2,
      title: 'Request additional evidence from claimant',
      caseId: 'CTD-2025-0037',
      caseName: 'SBI vs. Modern Solutions',
      assignedTo: 'Priya Sharma',
      dueDate: '2025-03-10',
      priority: 'Medium',
      status: 'Pending',
      description: 'Contact the claimant to request supporting documentation for their claims.'
    },
    {
      id: 3,
      title: 'Schedule mediation session',
      caseId: 'BKD-2025-0039',
      caseName: 'Axis Bank vs. Royal Construction',
      assignedTo: 'Rajesh Kumar',
      dueDate: '2025-03-08',
      priority: 'High',
      status: 'Completed',
      description: 'Coordinate with both parties to schedule the initial mediation session.'
    },
    {
      id: 4,
      title: 'Prepare for expert witness testimony',
      caseId: 'BKD-2025-0035',
      caseName: 'ICICI vs. Patel Bros',
      assignedTo: 'Sarah Johnson',
      dueDate: '2025-03-16',
      priority: 'High',
      status: 'Pending',
      description: 'Review expert witness credentials and prepare questions for the testimony session.'
    }
  ]);
  
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: 'All',
    priority: 'All',
    assignee: 'All'
  });
  const [newTask, setNewTask] = useState({
    title: '',
    caseId: '',
    caseName: '',
    assignedTo: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    description: ''
  });
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const statuses = ['All', 'Pending', 'In Progress', 'Completed', 'Overdue'];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];
  const assignees = ['All', 'John Smith', 'Priya Sharma', 'Rajesh Kumar', 'Sarah Johnson', 'Amit Patel'];
  
  const updateNewTask = (field, value) => {
    setNewTask({
      ...newTask,
      [field]: value
    });
  };
  
  const updateExistingTask = (taskId, field, value) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
  };
  
  const addNewTask = () => {
    if (!newTask.title || !newTask.caseId || !newTask.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newTaskWithId = {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id), 0) + 1
    };
    
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      title: '',
      caseId: '',
      caseName: '',
      assignedTo: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending',
      description: ''
    });
    setShowNewTaskForm(false);
  };
  
  const toggleTaskExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };
  
  const toggleTaskEdit = (taskId) => {
    setEditingTaskId(editingTaskId === taskId ? null : taskId);
    setExpandedTaskId(taskId);
  };
  
  const deleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDueDateClass = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'text-red-600 font-medium';
    } else if (diffDays === 0) {
      return 'text-orange-600 font-medium';
    } else if (diffDays <= 2) {
      return 'text-yellow-600';
    } else {
      return 'text-gray-500';
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    return (
      (activeFilters.status === 'All' || task.status === activeFilters.status) &&
      (activeFilters.priority === 'All' || task.priority === activeFilters.priority) &&
      (activeFilters.assignee === 'All' || task.assignedTo === activeFilters.assignee)
    );
  });
  
  const renderFilterDropdown = (label, icon, options, activeFilter, setFilter) => {
    return (
      <div className="relative">
        <button 
          className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {icon}
          <span className="ml-1">{label}: {activeFilter}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${activeFilter === option ? 'bg-gray-100' : ''}`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Manage Tasks</h2>
      </div>
      
      <div className="px-6 py-6">
        {/* Task Controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <button
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          >
            {showNewTaskForm ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add New Task
              </>
            )}
          </button>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative group">
              {renderFilterDropdown(
                'Status',
                <Clipboard className="h-5 w-5 text-gray-400" />,
                statuses,
                activeFilters.status,
                (status) => setActiveFilters({...activeFilters, status})
              )}
            </div>
            
            <div className="relative group">
              {renderFilterDropdown(
                'Priority',
                <Tag className="h-5 w-5 text-gray-400" />,
                priorities,
                activeFilters.priority,
                (priority) => setActiveFilters({...activeFilters, priority})
              )}
            </div>
            
            <div className="relative group">
              {renderFilterDropdown(
                'Assignee',
                <User className="h-5 w-5 text-gray-400" />,
                assignees,
                activeFilters.assignee,
                (assignee) => setActiveFilters({...activeFilters, assignee})
              )}
            </div>
          </div>
        </div>
        
        {/* New Task Form */}
        {showNewTaskForm && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.title}
                  onChange={(e) => updateNewTask('title', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case ID *</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.caseId}
                  onChange={(e) => updateNewTask('caseId', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Name</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.caseName}
                  onChange={(e) => updateNewTask('caseName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.assignedTo}
                  onChange={(e) => updateNewTask('assignedTo', e.target.value)}
                >
                  <option value="">Select assignee</option>
                  {assignees.filter(a => a !== 'All').map((assignee) => (
                    <option key={assignee} value={assignee}>
                      {assignee}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.dueDate}
                  onChange={(e) => updateNewTask('dueDate', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.priority}
                  onChange={(e) => updateNewTask('priority', e.target.value)}
                >
                  {priorities.filter(p => p !== 'All').map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newTask.status}
                  onChange={(e) => updateNewTask('status', e.target.value)}
                >
                  {statuses.filter(s => s !== 'All').map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows="3"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={newTask.description}
                onChange={(e) => updateNewTask('description', e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowNewTaskForm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={addNewTask}
              >
                Save Task
              </button>
            </div>
          </div>
        )}
        
        {/* Task List */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tasks ({filteredTasks.length})
          </h3>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No tasks found matching the selected filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Task Header */}
                  <div 
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-4 py-3 bg-gray-50 cursor-pointer"
                    onClick={() => toggleTaskExpand(task.id)}
                  >
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-500">
                          {task.caseId} • {task.caseName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center">
                      <span 
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityClass(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className={`text-sm ${getDueDateClass(task.dueDate)}`}>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {task.assignedTo || 'Unassigned'}
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskEdit(task.id);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Task Details - Expanded View */}
                  {expandedTaskId === task.id && !editingTaskId && (
                    <div className="px-4 py-3 border-t border-gray-200">
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Description</h5>
                        <p className="text-sm text-gray-600">{task.description || 'No description provided.'}</p>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={() => toggleTaskEdit(task.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Task Edit Form */}
                  {editingTaskId === task.id && (
                    <div className="px-4 py-3 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Edit Task</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.title}
                            onChange={(e) => updateExistingTask(task.id, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Case ID</label>
                          <input
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.caseId}
                            onChange={(e) => updateExistingTask(task.id, 'caseId', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Case Name</label>
                          <input
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.caseName}
                            onChange={(e) => updateExistingTask(task.id, 'caseName', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.assignedTo}
                            onChange={(e) => updateExistingTask(task.id, 'assignedTo', e.target.value)}
                          >
                            <option value="">Select assignee</option>
                            {assignees.filter(a => a !== 'All').map((assignee) => (
                              <option key={assignee} value={assignee}>
                                {assignee}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                          <input
                            type="date"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.dueDate}
                            onChange={(e) => updateExistingTask(task.id, 'dueDate', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.priority}
                            onChange={(e) => updateExistingTask(task.id, 'priority', e.target.value)}
                          >
                            {priorities.filter(p => p !== 'All').map((priority) => (
                              <option key={priority} value={priority}>
                                {priority}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={task.status}
                            onChange={(e) => updateExistingTask(task.id, 'status', e.target.value)}
                          >
                            {statuses.filter(s => s !== 'All').map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows="3"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          value={task.description}
                          onChange={(e) => updateExistingTask(task.id, 'description', e.target.value)}
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={() => setEditingTaskId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={() => setEditingTaskId(null)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}