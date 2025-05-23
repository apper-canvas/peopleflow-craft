import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const EmployeeSelfService = ({ isDarkMode, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef(null)

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1990-05-15',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    maritalStatus: 'Single',
    nationality: 'American'
  })

  // Professional Information State
  const [professionalInfo, setProfessionalInfo] = useState({
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Software Developer',
    manager: 'Sarah Johnson',
    startDate: '2023-01-15',
    employmentType: 'Full-time',
    workLocation: 'New York Office',
    salary: '$75,000',
    skills: 'React, JavaScript, Python, Node.js',
    certifications: 'AWS Certified Developer'
  })

  // Request State
  const [requestForm, setRequestForm] = useState({
    type: 'time-off',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'medium'
  })

  // Submitted Requests State
  const [submittedRequests, setSubmittedRequests] = useState([
    {
      id: 1,
      type: 'time-off',
      title: 'Summer Vacation',
      description: 'Family vacation to Europe',
      startDate: '2024-07-15',
      endDate: '2024-07-25',
      status: 'Pending',
      submittedDate: '2024-01-10'
    },
    {
      id: 2,
      type: 'update',
      title: 'Address Change',
      description: 'Update home address due to relocation',
      status: 'Approved',
      submittedDate: '2024-01-05'
    }
  ])

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'professional', label: 'Professional', icon: 'Briefcase' },
    { id: 'requests', label: 'Requests', icon: 'FileText' }
  ]

  const handlePersonalInfoUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Personal information updated successfully!')
    } catch (error) {
      toast.error('Failed to update personal information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfessionalInfoUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Professional information updated successfully!')
    } catch (error) {
      toast.error('Failed to update professional information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestSubmit = async (e) => {
    e.preventDefault()
    
    if (!requestForm.title.trim() || !requestForm.description.trim()) {
      toast.warning('Please fill in all required fields.')
      return
    }

    if (requestForm.type === 'time-off' && (!requestForm.startDate || !requestForm.endDate)) {
      toast.warning('Please select start and end dates for time-off requests.')
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newRequest = {
        id: submittedRequests.length + 1,
        ...requestForm,
        status: 'Pending',
        submittedDate: new Date().toISOString().split('T')[0]
      }
      
      setSubmittedRequests([newRequest, ...submittedRequests])
      setRequestForm({
        type: 'time-off',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: 'medium'
      })
      
      toast.success('Request submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmittedRequests(submittedRequests.filter(req => req.id !== requestId))
      toast.success('Request deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200'
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200'
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-neu-light dark:shadow-neu-dark">
                  <ApperIcon name="Users" className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-surface-100">
                    Employee Portal
                  </h1>
                  <p className="text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                    Self-Service Dashboard
                  </p>
                </div>
              </Link>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 shadow-card"
              >
                <ApperIcon name="ArrowLeft" className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 shadow-card"
              >
                <ApperIcon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="h-5 w-5 text-surface-700 dark:text-surface-300" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            Welcome, {personalInfo.firstName}!
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Manage your personal information, professional details, and submit requests all in one place.
          </p>
        </motion.div>

        {/* Instructions Card */}
        <motion.div 
          className="card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-xl">
              <ApperIcon name="Info" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                How to Use the Employee Portal
              </h3>
              <ul className="text-surface-600 dark:text-surface-400 space-y-1 text-sm">
                <li>• <strong>Personal Info:</strong> Update your contact details, emergency contacts, and personal preferences</li>
                <li>• <strong>Professional:</strong> View and request updates to your job-related information and skills</li>
                <li>• <strong>Requests:</strong> Submit time-off requests, address changes, and other update requests</li>
                <li>• All changes are subject to HR approval and will be reflected once processed</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-card'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                Personal Information
              </h3>
              <form onSubmit={handlePersonalInfoUpdate} ref={formRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Marital Status
                    </label>
                    <select
                      value={personalInfo.maritalStatus}
                      onChange={(e) => setPersonalInfo({...personalInfo, maritalStatus: e.target.value})}
                      className="input-field"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      value={personalInfo.emergencyContact}
                      onChange={(e) => setPersonalInfo({...personalInfo, emergencyContact: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.emergencyPhone}
                      onChange={(e) => setPersonalInfo({...personalInfo, emergencyPhone: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading && <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />}
                    <span>{isLoading ? 'Updating...' : 'Update Information'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Professional Information Tab */}
          {activeTab === 'professional' && (
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                Professional Information
              </h3>
              <form onSubmit={handleProfessionalInfoUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      value={professionalInfo.employeeId}
                      className="input-field bg-surface-50 dark:bg-surface-800"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={professionalInfo.department}
                      className="input-field bg-surface-50 dark:bg-surface-800"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={professionalInfo.position}
                      className="input-field bg-surface-50 dark:bg-surface-800"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Reporting Manager
                    </label>
                    <input
                      type="text"
                      value={professionalInfo.manager}
                      className="input-field bg-surface-50 dark:bg-surface-800"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={professionalInfo.startDate}
                      className="input-field bg-surface-50 dark:bg-surface-800"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Work Location
                    </label>
                    <input
                      type="text"
                      value={professionalInfo.workLocation}
                      onChange={(e) => setProfessionalInfo({...professionalInfo, workLocation: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Skills & Expertise
                    </label>
                    <textarea
                      value={professionalInfo.skills}
                      onChange={(e) => setProfessionalInfo({...professionalInfo, skills: e.target.value})}
                      className="input-field h-24"
                      placeholder="List your skills separated by commas"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Certifications
                    </label>
                    <textarea
                      value={professionalInfo.certifications}
                      onChange={(e) => setProfessionalInfo({...professionalInfo, certifications: e.target.value})}
                      className="input-field h-20"
                      placeholder="List your certifications"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading && <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />}
                    <span>{isLoading ? 'Updating...' : 'Update Information'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* New Request Form */}
              <div className="card p-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  Submit New Request
                </h3>
                <form onSubmit={handleRequestSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Request Type *
                      </label>
                      <select
                        value={requestForm.type}
                        onChange={(e) => setRequestForm({...requestForm, type: e.target.value})}
                        className="input-field"
                        required
                      >
                        <option value="time-off">Time Off Request</option>
                        <option value="update">Information Update</option>
                        <option value="general">General Request</option>
                        <option value="complaint">Complaint/Issue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Priority
                      </label>
                      <select
                        value={requestForm.priority}
                        onChange={(e) => setRequestForm({...requestForm, priority: e.target.value})}
                        className="input-field"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Request Title *
                      </label>
                      <input
                        type="text"
                        value={requestForm.title}
                        onChange={(e) => setRequestForm({...requestForm, title: e.target.value})}
                        className="input-field"
                        placeholder="Brief title for your request"
                        required
                      />
                    </div>
                    {requestForm.type === 'time-off' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Start Date *
                          </label>
                          <input
                            type="date"
                            value={requestForm.startDate}
                            onChange={(e) => setRequestForm({...requestForm, startDate: e.target.value})}
                            className="input-field"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            End Date *
                          </label>
                          <input
                            type="date"
                            value={requestForm.endDate}
                            onChange={(e) => setRequestForm({...requestForm, endDate: e.target.value})}
                            className="input-field"
                            required
                          />
                        </div>
                      </>
                    )}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={requestForm.description}
                        onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                        className="input-field h-32"
                        placeholder="Provide detailed information about your request"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isLoading && <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />}
                      <span>{isLoading ? 'Submitting...' : 'Submit Request'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Submitted Requests */}
              <div className="card p-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
                  My Requests
                </h3>
                {submittedRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <ApperIcon name="FileText" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                    <p className="text-surface-600 dark:text-surface-400">No requests submitted yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submittedRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 hover:shadow-card transition-all duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                                {request.title}
                              </h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </div>
                            <p className="text-surface-600 dark:text-surface-400 mb-2">
                              {request.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-surface-500 dark:text-surface-400">
                              <span>Type: {request.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                              <span>Submitted: {request.submittedDate}</span>
                              {request.startDate && request.endDate && (
                                <span>Dates: {request.startDate} to {request.endDate}</span>
                              )}
                            </div>
                          </div>
                          {request.status === 'Pending' && (
                            <button
                              onClick={() => handleDeleteRequest(request.id)}
                              className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                              title="Delete Request"
                            >
                              <ApperIcon name="Trash2" className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default EmployeeSelfService