import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import ApperIcon from './ApperIcon'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const PerformanceMetrics = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState('all')
  const [activeMetric, setActiveMetric] = useState('overview')

  // Sample data for performance metrics
  const [performanceData, setPerformanceData] = useState({
    employees: [
      { id: 1, name: "Sarah Johnson", department: "Engineering", performance: 92, projects: 8, completionRate: 95 },
      { id: 2, name: "Michael Chen", department: "Design", performance: 88, projects: 6, completionRate: 90 },
      { id: 3, name: "Emily Rodriguez", department: "Marketing", performance: 85, projects: 4, completionRate: 88 }
    ],
    teams: [
      { department: "Engineering", avgPerformance: 89, projectsCompleted: 24, satisfaction: 4.2 },
      { department: "Design", avgPerformance: 87, projectsCompleted: 18, satisfaction: 4.5 },
      { department: "Marketing", avgPerformance: 84, projectsCompleted: 12, satisfaction: 4.1 }
    ],
    kpis: {
      avgProjectCompletion: 14.5, // days
      employeeEngagement: 87, // percentage
      productivityGrowth: 12.3, // percentage
      teamEfficiency: 91 // percentage
    }
  })

  const departments = ['all', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance']
  const timeRanges = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' }
  ]

  // Generate sample time-series data
  const generateTimeSeriesData = (days = 30) => {
    const labels = []
    const data = []
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i)
      labels.push(format(date, 'MMM dd'))
      data.push(Math.floor(Math.random() * 20) + 75 + Math.sin(i * 0.1) * 10)
    }
    
    return { labels, data }
  }

  const timeSeriesData = generateTimeSeriesData(
    selectedTimeRange === 'week' ? 7 : 
    selectedTimeRange === 'month' ? 30 : 
    selectedTimeRange === 'quarter' ? 90 : 365
  )

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e2e8f0' : '#334155',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        titleColor: isDarkMode ? '#e2e8f0' : '#334155',
        bodyColor: isDarkMode ? '#cbd5e1' : '#64748b',
        borderColor: isDarkMode ? '#475569' : '#e2e8f0',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: isDarkMode ? '#374151' : '#f1f5f9' },
        ticks: { color: isDarkMode ? '#9ca3af' : '#64748b' }
      },
      y: {
        grid: { color: isDarkMode ? '#374151' : '#f1f5f9' },
        ticks: { color: isDarkMode ? '#9ca3af' : '#64748b' }
      }
    }
  }

  // Performance Trend Chart
  const performanceTrendData = {
    labels: timeSeriesData.labels,
    datasets: [
      {
        label: 'Team Performance',
        data: timeSeriesData.data,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Department Performance Chart
  const departmentPerformanceData = {
    labels: performanceData.teams.map(team => team.department),
    datasets: [
      {
        label: 'Avg Performance',
        data: performanceData.teams.map(team => team.avgPerformance),
        backgroundColor: ['#2563eb', '#7c3aed', '#f59e0b'],
        borderColor: ['#1d4ed8', '#5b21b6', '#d97706'],
        borderWidth: 2
      }
    ]
  }

  // Project Completion Chart
  const projectCompletionData = {
    labels: ['Completed', 'In Progress', 'Overdue'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: ['#059669', '#d97706', '#dc2626'],
        borderWidth: 2
      }
    ]
  }

  // Employee Engagement Chart
  const engagementData = {
    labels: timeSeriesData.labels.slice(-7),
    datasets: [
      {
        label: 'Employee Engagement',
        data: [82, 85, 87, 86, 89, 91, 87],
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        borderColor: '#7c3aed',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }
    ]
  }

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'timeRange') {
      setSelectedTimeRange(value)
      toast.success(`Time range updated to ${timeRanges.find(t => t.value === value)?.label}`)
    } else if (filterType === 'department') {
      setSelectedDepartment(value)
      toast.success(`Filtered by ${value === 'all' ? 'all departments' : value}`)
    } else if (filterType === 'employee') {
      setSelectedEmployee(value)
      toast.success(`Filtered by ${value === 'all' ? 'all employees' : value}`)
    }
  }

  const exportData = () => {
    toast.success('Performance data exported successfully!')
  }

  const refreshData = () => {
    toast.info('Refreshing performance data...')
    // Simulate data refresh
    setTimeout(() => {
      toast.success('Performance data updated!')
    }, 1500)
  }

  // Gauge Chart Component
  const GaugeChart = ({ value, title, max = 100, color = '#2563eb' }) => {
    const percentage = (value / max) * 100
    const strokeDasharray = `${percentage} ${100 - percentage}`
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-surface-200 dark:text-surface-700"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke={color}
              strokeWidth="3"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-surface-900 dark:text-surface-100">{value}%</span>
          </div>
        </div>
        <p className="text-sm text-surface-600 dark:text-surface-400 mt-2 text-center">{title}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-analytics-dashboard bg-project-overlay">
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
                  <ApperIcon name="BarChart3" className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-surface-100">
                    Performance Metrics
                  </h1>
                  <p className="text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                    Analytics & KPI Dashboard
                  </p>
                </div>
              </Link>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 shadow-card"
                title="Refresh Data"
              >
                <ApperIcon name="RefreshCw" className="h-5 w-5 text-surface-700 dark:text-surface-300" />
              </button>
              <button
                onClick={exportData}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-200 shadow-card"
              >
                <ApperIcon name="Download" className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 shadow-card"
              >
                <ApperIcon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="h-5 w-5 text-surface-700 dark:text-surface-300" 
                />
              </button>
              <Link
                to="/"
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-200 shadow-card"
              >
                <ApperIcon name="Home" className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card p-4 md:p-6 backdrop-blur-sm bg-white/95 dark:bg-surface-800/95">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Filters & Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                  Time Range
                </label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                  className="input-field"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="input-field"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-surface-100 mb-2">
                  Employee
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => handleFilterChange('employee', e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Employees</option>
                  {performanceData.employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="Clock" className="h-8 w-8 text-blue-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">↗ 8%</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
              {performanceData.kpis.avgProjectCompletion} days
            </div>
            <p className="text-surface-600 dark:text-surface-400">Avg Project Completion</p>
          </div>

          <div className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="Heart" className="h-8 w-8 text-red-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">↗ 5%</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
              {performanceData.kpis.employeeEngagement}%
            </div>
            <p className="text-surface-600 dark:text-surface-400">Employee Engagement</p>
          </div>

          <div className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="TrendingUp" className="h-8 w-8 text-green-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">↗ 12%</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
              {performanceData.kpis.productivityGrowth}%
            </div>
            <p className="text-surface-600 dark:text-surface-400">Productivity Growth</p>
          </div>

          <div className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90">
            <div className="flex items-center justify-between mb-4">
              <ApperIcon name="Users" className="h-8 w-8 text-purple-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">↗ 3%</span>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
              {performanceData.kpis.teamEfficiency}%
            </div>
            <p className="text-surface-600 dark:text-surface-400">Team Efficiency</p>
          </div>
        </motion.div>

        {/* Gauge Charts */}
        <motion.div 
          className="card p-6 mb-8 backdrop-blur-sm bg-white/95 dark:bg-surface-800/95"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
            Performance Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GaugeChart 
              value={performanceData.kpis.employeeEngagement} 
              title="Employee Engagement" 
              color="#2563eb" 
            />
            <GaugeChart 
              value={performanceData.kpis.teamEfficiency} 
              title="Team Efficiency" 
              color="#7c3aed" 
            />
            <GaugeChart 
              value={85} 
              title="Quality Score" 
              color="#10b981" 
            />
            <GaugeChart 
              value={78} 
              title="Innovation Index" 
              color="#f59e0b" 
            />
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <motion.div 
            className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Performance Trend
            </h3>
            <div className="h-64">
              <Line data={performanceTrendData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Department Performance */}
          <motion.div 
            className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Department Performance
            </h3>
            <div className="h-64">
              <Bar data={departmentPerformanceData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Project Status */}
          <motion.div 
            className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90 bg-task-management"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Project Status Distribution
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-48 h-48">
                <Doughnut data={projectCompletionData} options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: { position: 'bottom' }
                  }
                }} />
              </div>
            </div>
          </motion.div>

          {/* Employee Engagement Trend */}
          <motion.div 
            className="card p-6 backdrop-blur-sm bg-white/90 dark:bg-surface-800/90"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Employee Engagement Trend
            </h3>
            <div className="h-64">
              <Line data={engagementData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Employee Performance Table */}
        <motion.div 
          className="card p-6 backdrop-blur-sm bg-white/95 dark:bg-surface-800/95"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
              Individual Performance
            </h3>
            <button 
              onClick={() => toast.info('Detailed performance report generated')}
              className="btn-primary flex items-center space-x-2"
            >
              <ApperIcon name="FileText" className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-700">
                  <th className="text-left py-3 px-4 text-surface-900 dark:text-surface-100 font-semibold">Employee</th>
                  <th className="text-left py-3 px-4 text-surface-900 dark:text-surface-100 font-semibold">Department</th>
                  <th className="text-left py-3 px-4 text-surface-900 dark:text-surface-100 font-semibold">Performance</th>
                  <th className="text-left py-3 px-4 text-surface-900 dark:text-surface-100 font-semibold">Projects</th>
                  <th className="text-left py-3 px-4 text-surface-900 dark:text-surface-100 font-semibold">Completion Rate</th>
                  <th className="text-left py-3 px-4 text-surface-900 dark:text-surface-100 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.employees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="py-4 px-4 text-surface-900 dark:text-surface-100">{employee.name}</td>
                    <td className="py-4 px-4 text-surface-600 dark:text-surface-400">{employee.department}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-surface-200 dark:bg-surface-700 rounded-full">
                          <div 
                            className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                            style={{ width: `${employee.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-surface-600 dark:text-surface-400">{employee.performance}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-surface-600 dark:text-surface-400">{employee.projects}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {employee.completionRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toast.info(`Viewing detailed report for ${employee.name}`)}
                          className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                          title="View Details"
                        >
                          <ApperIcon name="Eye" className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                        </button>
                        <button 
                          onClick={() => toast.success(`Performance review initiated for ${employee.name}`)}
                          className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                          title="Performance Review"
                        >
                          <ApperIcon name="ClipboardList" className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default PerformanceMetrics