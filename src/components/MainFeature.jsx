import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, addDays, subDays, startOfWeek, endOfWeek } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = forwardRef((props, ref) => {
  const elementRef = useRef(null)
  const [activeTab, setActiveTab] = useState('employees')
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      department: "Engineering",
      position: "Senior Developer",
      email: "sarah.johnson@company.com",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b9e5?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      department: "Design",
      position: "UX Designer",
      email: "michael.chen@company.com",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      department: "Marketing",
      position: "Marketing Manager",
      email: "emily.rodriguez@company.com",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ])

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [attendanceDate, setAttendanceDate] = useState(new Date())
  const [newEmployee, setNewEmployee] = useState({
    employeeId: '',
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    department: '',
    jobTitle: '',
    employmentType: '',
    dateJoining: '',
    reportingManager: '',
    workLocation: '',
    notes: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Building a modern e-commerce platform with React and Node.js",
      status: "in-progress",
      assignedEmployees: [1, 2],
      deadline: addDays(new Date(), 30)
    },
    {
      id: 2,
      name: "Mobile App Redesign", 
      description: "Complete redesign of the mobile application interface",
      status: "planning",
      assignedEmployees: [2, 3],
      deadline: addDays(new Date(), 45)
    }
  ])
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    deadline: '',
    assignedEmployees: [],
    status: 'open',
    notes: '',
    comments: ''
  })
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  // Attendance State
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem('attendanceRecords')
    return saved ? JSON.parse(saved) : {}
  })

  // Save attendance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords))
  }, [attendanceRecords])

  const [attendanceLoading, setAttendanceLoading] = useState(false)
  const [isAttendanceFormVisible, setIsAttendanceFormVisible] = useState(false)
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null)

  const projectStatuses = ['open', 'in-progress', 'completed']

  const tabs = [
    { id: 'employees', label: 'Employee Management', icon: 'Users' },
    { id: 'attendance', label: 'Attendance Tracking', icon: 'Clock' },
    { id: 'projects', label: 'Project Assignments', icon: 'FolderOpen' }
  ]

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance']

  useImperativeHandle(ref, () => ({
    activateTab: (tabId) => {
      setActiveTab(tabId)
      if (tabId === 'employees') {
        // Auto-open the Add Employee form when navigated from Quick Actions
        setTimeout(() => {
          setShowAddForm(true)
        }, 300)
      }
    },
    scrollIntoView: (options) => elementRef.current?.scrollIntoView(options),
    element: elementRef.current
  }))

  const handleAddEmployee = (e) => {
    e.preventDefault()
    if (newEmployee.employeeId && newEmployee.name && newEmployee.email && newEmployee.phoneNumber && newEmployee.department && newEmployee.jobTitle && newEmployee.employmentType && newEmployee.dateJoining && newEmployee.reportingManager && newEmployee.workLocation) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee,
        position: newEmployee.jobTitle,
        status: 'active',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      }
      setEmployees([...employees, employee])
      setNewEmployee({ employeeId: '', name: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '', department: '', jobTitle: '', employmentType: '', dateJoining: '', reportingManager: '', workLocation: '', notes: '' })
      setShowAddForm(false)
      toast.success(`Employee ${newEmployee.name} added successfully!`)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setNewEmployee({
      employeeId: employee.employeeId || employee.id,
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber || '',
      dateOfBirth: employee.dateOfBirth || '',
      gender: employee.gender || '',
      department: employee.department,
      jobTitle: employee.position,
      employmentType: employee.employmentType || 'Full-time',
      dateJoining: employee.dateJoining || '',
      reportingManager: employee.reportingManager || '',
      workLocation: employee.workLocation || '',
      notes: employee.notes || ''
    })
    setShowEditForm(true)
  }

  const handleUpdateEmployee = (e) => {
    e.preventDefault()
    if (newEmployee.employeeId && newEmployee.name && newEmployee.email && newEmployee.phoneNumber && newEmployee.department && newEmployee.jobTitle && newEmployee.employmentType && newEmployee.dateJoining && newEmployee.reportingManager && newEmployee.workLocation) {
      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id 
          ? {
              ...emp,
              ...newEmployee,
              position: newEmployee.jobTitle,
              avatar: emp.avatar
            }

          : emp
      )
      setEmployees(updatedEmployees)
      setNewEmployee({ employeeId: '', name: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '', department: '', jobTitle: '', employmentType: '', dateJoining: '', reportingManager: '', workLocation: '', notes: '' })
      setShowEditForm(false)
      setEditingEmployee(null)
      toast.success(`Employee ${newEmployee.name} updated successfully!`)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id))
    toast.success('Employee removed successfully')
  }

  // Attendance functions
  const handleAttendanceToggle = async (employeeId, employeeName) => {
    setAttendanceLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const today = new Date().toISOString().split('T')[0]
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
      
      const recordKey = `${employeeId}-${today}`
      const existingRecord = attendanceRecords[recordKey]
      
      if (!existingRecord) {
        // Sign in
        setAttendanceRecords(prev => ({
          ...prev,
          [recordKey]: {
            employeeId,
            employeeName,
            date: today,
            checkIn: currentTime,
            checkOut: null
          }
        }))
        toast.success(`${employeeName} signed in at ${currentTime}`)
      } else if (!existingRecord.checkOut) {
        // Sign out
        setAttendanceRecords(prev => ({
          ...prev,
          [recordKey]: {
            ...existingRecord,
            checkOut: currentTime
          }
        }))
        toast.success(`${employeeName} signed out at ${currentTime}`)
      } else {
        toast.warning(`${employeeName} has already completed attendance for today`)
      }
    } catch (error) {
      toast.error('Failed to update attendance. Please try again.')
    } finally {
      setAttendanceLoading(false)
    }
  }

  const getAttendanceStatus = (employeeId) => {
    const today = new Date().toISOString().split('T')[0]
    const recordKey = `${employeeId}-${today}`
    const record = attendanceRecords[recordKey]
    
    if (!record) return { status: 'not-signed-in', checkIn: null, checkOut: null, totalHours: null }
    if (record.checkIn && !record.checkOut) return { 
      status: 'signed-in', 
      checkIn: record.checkIn, 
      checkOut: null, 
      totalHours: null 
    }
    if (record.checkIn && record.checkOut) return { 
      status: 'completed', 
      checkIn: record.checkIn, 
      checkOut: record.checkOut, 
      totalHours: calculateTotalHours(record.checkIn, record.checkOut)
    }
    
    return { status: 'not-signed-in', checkIn: null, checkOut: null, totalHours: null }
  }

  const calculateTotalHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return null
    
    const [checkInHour, checkInMin] = checkIn.split(':').map(Number)
    const [checkOutHour, checkOutMin] = checkOut.split(':').map(Number)
    
    const checkInDate = new Date()
    checkInDate.setHours(checkInHour, checkInMin, 0, 0)
    
    const checkOutDate = new Date()
    checkOutDate.setHours(checkOutHour, checkOutMin, 0, 0)
    
    const diffMs = checkOutDate - checkInDate
    const totalMinutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    return `${hours}h ${minutes}m`
  }

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployeeDetails(employee)
  }

  const handleCloseEmployeeDetails = () => {
    setSelectedEmployeeDetails(null)
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    if (newProject.name && newProject.description && newProject.startDate && newProject.deadline) {
      if (isEditMode && editingProject) {
        // Update existing project
        const updatedProjects = projects.map(p => 
          p.id === editingProject.id 
            ? {
                ...p,
                ...newProject,
                startDate: new Date(newProject.startDate),
                deadline: new Date(newProject.deadline)
              }
            : p
        )
        setProjects(updatedProjects)
        toast.success(`Project "${newProject.name}" updated successfully!`)
      } else {
        // Create new project
        const project = {
          id: projects.length + 1,
          ...newProject,
          startDate: new Date(newProject.startDate),
          deadline: new Date(newProject.deadline),
          assignedEmployees: newProject.assignedEmployees
        }
        setProjects([...projects, project])
        toast.success(`Project "${newProject.name}" created successfully!`)
      }
      setNewProject({ name: '', description: '', startDate: '', deadline: '', assignedEmployees: [], status: 'open', notes: '', comments: '' })
      setShowProjectForm(false)
      setEditingProject(null)
      setIsEditMode(false)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const handleEditProject = (project) => {
    setNewProject({
      name: project.name,
      description: project.description,
      startDate: format(project.startDate || new Date(), 'yyyy-MM-dd'),
      deadline: format(project.deadline, 'yyyy-MM-dd'),
      assignedEmployees: project.assignedEmployees || [],
      status: project.status,
      notes: project.notes || '',
      comments: project.comments || ''
    })
    setEditingProject(project)
    setIsEditMode(true)
    setShowProjectForm(true)
  }

  const toggleEmployeeAssignment = (employeeId) => {
    setNewProject(prev => ({
      ...prev,
      assignedEmployees: prev.assignedEmployees.includes(employeeId)
        ? prev.assignedEmployees.filter(id => id !== employeeId)
        : [...prev.assignedEmployees, employeeId]
    }))
  }

  const mockAttendance = [
    { employeeId: 1, date: format(new Date(), 'yyyy-MM-dd'), checkIn: '09:00', checkOut: '17:30', status: 'present' },
    { employeeId: 2, date: format(new Date(), 'yyyy-MM-dd'), checkIn: '09:15', checkOut: '17:45', status: 'present' },
    { employeeId: 3, date: format(new Date(), 'yyyy-MM-dd'), checkIn: '--', checkOut: '--', status: 'absent' }
  ]

  const renderEmployeeManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-surface-100">
          Employee Directory
        </h3>
        <motion.button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="UserPlus" className="h-4 w-4" />
          <span>Add Employee</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-4 md:p-6"
          >
            <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Add New Employee
            </h4>
            <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Employee ID"
                value={newEmployee.employeeId}
                onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newEmployee.phoneNumber}
                onChange={(e) => setNewEmployee({...newEmployee, phoneNumber: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={newEmployee.dateOfBirth}
                onChange={(e) => setNewEmployee({...newEmployee, dateOfBirth: e.target.value})}
                className="input-field"
                required
              />
              <select
                value={newEmployee.gender}
                onChange={(e) => setNewEmployee({...newEmployee, gender: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Job Title"
                value={newEmployee.jobTitle}
                onChange={(e) => setNewEmployee({...newEmployee, jobTitle: e.target.value})}
                className="input-field"
                required
              />
              <select
                value={newEmployee.employmentType}
                onChange={(e) => setNewEmployee({...newEmployee, employmentType: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <input
                type="date"
                placeholder="Date Joining"
                value={newEmployee.dateJoining}
                onChange={(e) => setNewEmployee({...newEmployee, dateJoining: e.target.value})}
                className="input-field"
                required
              />
              <select
                value={newEmployee.reportingManager}
                onChange={(e) => setNewEmployee({...newEmployee, reportingManager: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select Reporting Manager</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Work Location"
                value={newEmployee.workLocation}
                onChange={(e) => setNewEmployee({...newEmployee, workLocation: e.target.value})}
                className="input-field"
                required
              />
              <div className="md:col-span-2">
                <textarea
                  placeholder="Notes/Remarks (Optional)"
                  value={newEmployee.notes}
                  onChange={(e) => setNewEmployee({...newEmployee, notes: e.target.value})}
                  className="input-field resize-none h-20"
                />
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                <button type="submit" className="btn-primary flex-1">
                  Add Employee
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowEditForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="card p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  Edit Employee - {editingEmployee?.name}
                </h4>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={newEmployee.employeeId}
                  onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newEmployee.phoneNumber}
                  onChange={(e) => setNewEmployee({...newEmployee, phoneNumber: e.target.value})}
                  className="input-field"
                  required
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={newEmployee.dateOfBirth}
                  onChange={(e) => setNewEmployee({...newEmployee, dateOfBirth: e.target.value})}
                  className="input-field"
                  required
                />
                <select
                  value={newEmployee.gender}
                  onChange={(e) => setNewEmployee({...newEmployee, gender: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={newEmployee.jobTitle}
                  onChange={(e) => setNewEmployee({...newEmployee, jobTitle: e.target.value})}
                  className="input-field"
                  required
                />
                <select
                  value={newEmployee.employmentType}
                  onChange={(e) => setNewEmployee({...newEmployee, employmentType: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                <input
                  type="date"
                  placeholder="Date Joining"
                  value={newEmployee.dateJoining}
                  onChange={(e) => setNewEmployee({...newEmployee, dateJoining: e.target.value})}
                  className="input-field"
                  required
                />
                <select
                  value={newEmployee.reportingManager}
                  onChange={(e) => setNewEmployee({...newEmployee, reportingManager: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Reporting Manager</option>
                  {employees.filter(emp => emp.id !== editingEmployee?.id).map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Work Location"
                  value={newEmployee.workLocation}
                  onChange={(e) => setNewEmployee({...newEmployee, workLocation: e.target.value})}
                  className="input-field"
                  required
                />
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Notes/Remarks (Optional)"
                    value={newEmployee.notes}
                    onChange={(e) => setNewEmployee({...newEmployee, notes: e.target.value})}
                    className="input-field resize-none h-20"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    Update Employee
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowEditForm(false)
                      setEditingEmployee(null)
                      setNewEmployee({ employeeId: '', name: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '', department: '', jobTitle: '', employmentType: '', dateJoining: '', reportingManager: '', workLocation: '', notes: '' })
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.id}
            className="card p-4 md:p-6 hover:shadow-soft transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-200 dark:ring-surface-600"
                />
                <div>
                  <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                    {employee.name}
                  </h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {employee.position}
                  </p>
                </div>
              </div>
              <button
              onClick={() => handleEditEmployee(employee)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 mr-1"
            >
              <ApperIcon name="Edit" className="h-4 w-4 text-blue-500" />
            </button>
            <button
                onClick={() => handleDeleteEmployee(employee.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Building" className="h-4 w-4 text-surface-500" />
                <span className="text-surface-600 dark:text-surface-400">{employee.department}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Mail" className="h-4 w-4 text-surface-500" />
                <span className="text-surface-600 dark:text-surface-400 truncate">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 dark:text-green-400 capitalize">{employee.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAttendanceTracking = () => (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-surface-100">
          Attendance Management
        </h3>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={format(attendanceDate, 'yyyy-MM-dd')}
            onChange={(e) => setAttendanceDate(new Date(e.target.value))}
            className="input-field text-sm"
          />
        </div>
      </div>

      <div className={`card p-4 md:p-6 transition-all duration-300 ${selectedEmployeeDetails ? 'lg:mr-96' : ''}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="text-left py-3 text-surface-700 dark:text-surface-300 font-medium">Employee</th>
                <th className="text-left py-3 text-surface-700 dark:text-surface-300 font-medium">Check-In</th>
                <th className="text-left py-3 text-surface-700 dark:text-surface-300 font-medium">Check-Out</th>
                <th className="text-left py-3 text-surface-700 dark:text-surface-300 font-medium">Total Hours</th>
                <th className="text-left py-3 text-surface-700 dark:text-surface-300 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {employees.map((employee) => {
                const attendanceStatus = getAttendanceStatus(employee.id)
                return (
                  <tr 
                    key={employee.id} 
                    className="hover:bg-surface-50 dark:hover:bg-surface-800/50 cursor-pointer transition-colors duration-200"
                    onClick={() => handleEmployeeSelect(employee)}
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-medium">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-surface-900 dark:text-surface-100">{employee.name}</p>
                          <p className="text-sm text-surface-600 dark:text-surface-400">{employee.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      {attendanceStatus.checkIn ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {attendanceStatus.checkIn}
                        </span>
                      ) : (
                        <span className="text-surface-400 dark:text-surface-500">-</span>
                      )}
                    </td>
                    <td className="py-4">
                      {attendanceStatus.checkOut ? (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {attendanceStatus.checkOut}
                        </span>
                      ) : (
                        <span className="text-surface-400 dark:text-surface-500">-</span>
                      )}
                    </td>
                    <td className="py-4">
                      {attendanceStatus.totalHours ? (
                        <span className="text-purple-600 dark:text-purple-400 font-medium">
                          {attendanceStatus.totalHours}
                        </span>
                      ) : (
                        <span className="text-surface-400 dark:text-surface-500">-</span>
                      )}
                    </td>
                    <td className="py-4">
                      {attendanceStatus.status === 'completed' ? (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={(e) => e.stopPropagation()}
                          onClick={() => handleAttendanceToggle(employee.id, employee.name)}
                          disabled={attendanceLoading}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                            attendanceStatus.status === 'not-signed-in'
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {attendanceLoading ? (
                            <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                          ) : (
                            attendanceStatus.status === 'not-signed-in' ? 'Sign In' : 'Sign Out'
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Panel */}
      {selectedEmployeeDetails && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-0 right-0 h-full w-80 lg:w-96 bg-white dark:bg-surface-800 shadow-2xl z-50 overflow-y-auto border-l border-surface-200 dark:border-surface-700"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                Employee Details
              </h3>
              <button
                onClick={handleCloseEmployeeDetails}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
              >
                <ApperIcon name="X" className="h-5 w-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>

            {/* Employee Avatar and Basic Info */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4">
                <img
                  src={selectedEmployeeDetails.avatar}
                  alt={selectedEmployeeDetails.name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-primary/20"
                />
              </div>
              <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                {selectedEmployeeDetails.name}
              </h4>
              <p className="text-surface-600 dark:text-surface-400">
                {selectedEmployeeDetails.position}
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {selectedEmployeeDetails.status}
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-3 uppercase tracking-wide">
                Personal Information
              </h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Building" className="h-4 w-4 text-surface-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Department</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployeeDetails.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Mail" className="h-4 w-4 text-surface-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Email</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100 break-all">{selectedEmployeeDetails.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Phone" className="h-4 w-4 text-surface-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Phone</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployeeDetails.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-3 uppercase tracking-wide">
                Professional Information
              </h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="IdCard" className="h-4 w-4 text-surface-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Employee ID</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployeeDetails.employeeId || selectedEmployeeDetails.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Calendar" className="h-4 w-4 text-surface-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Date Joining</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployeeDetails.dateJoining || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="MapPin" className="h-4 w-4 text-surface-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Work Location</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployeeDetails.workLocation || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Attendance */}
            <div className="bg-surface-50 dark:bg-surface-700/50 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-3 uppercase tracking-wide">
                Today's Attendance
              </h5>
              {(() => {
                const attendanceStatus = getAttendanceStatus(selectedEmployeeDetails.id)
                return (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Check-In:</span>
                      <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                        {attendanceStatus.checkIn || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Check-Out:</span>
                      <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                        {attendanceStatus.checkOut || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Total Hours:</span>
                      <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                        {attendanceStatus.totalHours || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Status:</span>
                      <span className={`text-sm font-medium ${
                        attendanceStatus.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                        attendanceStatus.status === 'signed-in' ? 'text-blue-600 dark:text-blue-400' :
                        'text-surface-600 dark:text-surface-400'
                      }`}>
                        {attendanceStatus.status === 'not-signed-in' ? 'Not signed in' :
                         attendanceStatus.status === 'signed-in' ? 'Currently signed in' :
                         'Completed'}
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </motion.div>
      )}

      {/* Overlay */}
      {selectedEmployeeDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={handleCloseEmployeeDetails}
        />
      )}
    </div>
  )

  const renderOldAttendanceTracking = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-surface-100">
          Attendance Overview
        </h3>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={format(attendanceDate, 'yyyy-MM-dd')}
            onChange={(e) => setAttendanceDate(new Date(e.target.value))}
            className="input-field text-sm"
          />
        </div>
      </div>

      <div className="card p-4 md:p-6 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="text-left py-3 text-surface-900 dark:text-surface-100 font-semibold">Employee</th>
              <th className="text-left py-3 text-surface-900 dark:text-surface-100 font-semibold">Check In</th>
              <th className="text-left py-3 text-surface-900 dark:text-surface-100 font-semibold">Check Out</th>
              <th className="text-left py-3 text-surface-900 dark:text-surface-100 font-semibold">Status</th>
              <th className="text-left py-3 text-surface-900 dark:text-surface-100 font-semibold">Hours</th>
            </tr>
          </thead>
          <tbody>
            {mockAttendance.map((record, index) => {
              const employee = employees.find(emp => emp.id === record.employeeId)
              const hours = record.checkIn !== '--' && record.checkOut !== '--' 
                ? '8h 30m' 
                : '--'
              
              return (
                <motion.tr
                  key={record.employeeId}
                  className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={employee?.avatar}
                        alt={employee?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-surface-900 dark:text-surface-100">{employee?.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-surface-600 dark:text-surface-400">{record.checkIn}</td>
                  <td className="py-4 text-surface-600 dark:text-surface-400">{record.checkOut}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === 'present' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 text-surface-600 dark:text-surface-400">{hours}</td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderProjectAssignments = () => (
    <div className="space-y-6 bg-project-workspace bg-project-overlay rounded-2xl p-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-surface-100">
          Project Assignments
        </h3>
        <motion.button
          onClick={() => setShowProjectForm(!showProjectForm)}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>New Project</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showProjectForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-4 md:p-6 backdrop-blur-sm bg-white/95 dark:bg-surface-800/95"
          >
            <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
              {isEditMode ? 'Edit Project' : 'Create New Project'}
            </h4>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="input-field"
                  required
                />
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Deadline
                  </label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                  className="input-field"
                  required
                />
                </div>
              </div>
              
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="input-field resize-none h-20"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Notes
                  </label>
                  <textarea
                    placeholder="Additional project notes..."
                    value={newProject.notes}
                    onChange={(e) => setNewProject({...newProject, notes: e.target.value})}
                    className="input-field resize-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Comments
                  </label>
                  <textarea
                    placeholder="Project comments..."
                    value={newProject.comments}
                    onChange={(e) => setNewProject({...newProject, comments: e.target.value})}
                    className="input-field resize-none h-20"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                  Assign Team Members (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {employees.map((employee) => (
                    <label 
                      key={employee.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-surface-200 dark:border-surface-600 hover:bg-surface-50 dark:hover:bg-surface-700/50 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={newProject.assignedEmployees.includes(employee.id)}
                        onChange={() => toggleEmployeeAssignment(employee.id)}
                        className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary/50"
                      />
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-surface-900 dark:text-surface-100">
                        {employee.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" className="btn-primary flex-1">
                  {isEditMode ? 'Update Project' : 'Create Project'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowProjectForm(false)
                    setEditingProject(null)
                    setIsEditMode(false)
                    setNewProject({ name: '', description: '', startDate: '', deadline: '', assignedEmployees: [], status: 'open', notes: '', comments: '' })
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="card p-4 md:p-6 hover:shadow-soft transition-all duration-300 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                {project.name}
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                  title="Edit Project"
                >
                  <ApperIcon name="Edit" className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                </button>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === 'in-progress' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {project.status.replace('-', ' ')}
              </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                <ApperIcon name="Calendar" className="h-4 w-4" />
                <span>Due: {format(project.deadline, 'MMM dd, yyyy')}</span>
              </div>

              <div>
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                  Assigned Team:
                </p>
                <div className="flex -space-x-2">
                  {project.assignedEmployees.map(empId => {
                    const employee = employees.find(emp => emp.id === empId)
                    return employee ? (
                      <img
                        key={empId}
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-surface-800 hover:scale-110 transition-transform duration-200"
                        title={employee.name}
                      />
                    ) : null
                  })}
                  <button className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center ring-2 ring-white dark:ring-surface-800 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-200">
                    <ApperIcon name="Plus" className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: project.status === 'in-progress' ? '65%' : '20%' }}
                  ></div>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                  {project.status === 'in-progress' ? '65% Complete' : '20% Complete'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <motion.div 
      ref={elementRef}
      className="w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-surface-200 dark:border-surface-700">
          <nav className="flex space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm md:text-base whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'employees' && renderEmployeeManagement()}
          {activeTab === 'attendance' && renderAttendanceTracking()}
          {activeTab === 'projects' && renderProjectAssignments()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})

export default MainFeature