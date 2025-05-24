import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'

const Home = ({ isDarkMode, setIsDarkMode }) => {
  const mainFeatureRef = useRef(null)

  const handleQuickAction = (action) => {
    if (action === 'Add Employee') {
      mainFeatureRef.current?.activateTab('employees')
      setTimeout(() => mainFeatureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } else if (action === 'Track Attendance') {
      mainFeatureRef.current?.activateTab('attendance')
      setTimeout(() => mainFeatureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } else if (action === 'Performance Review') {
      window.location.href = '/performance-metrics'
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
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-neu-light dark:shadow-neu-dark">
                <ApperIcon name="Users" className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-surface-100">
                  PeopleFlow
                </h1>
                <p className="text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                  HR Management System
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
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
                to="/performance-metrics"
                className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary-dark text-white font-medium transition-all duration-200 shadow-card hover:shadow-soft"
              >
                <ApperIcon name="BarChart3" className="h-4 w-4" />
                <span>Performance</span>
              </Link>
              <Link
                to="/employee-portal"
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-200 shadow-card hover:shadow-soft"
              >
                <ApperIcon name="User" className="h-4 w-4" />
                <span>Employee Portal</span>
              </Link>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                <ApperIcon name="Users" className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-surface-100 mb-4 md:mb-6">
            Streamline Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Workforce Management</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive HR platform for managing employee records, tracking attendance, assigning projects, and evaluating performance - all from one centralized dashboard.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: "Users", label: "Employees", value: "247", color: "text-blue-500" },
            { icon: "Clock", label: "Avg Hours", value: "40.2", color: "text-green-500" },
            { icon: "FolderOpen", label: "Projects", value: "18", color: "text-purple-500" },
            { icon: "TrendingUp", label: "Performance", value: "94%", color: "text-orange-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card p-4 md:p-6 hover:shadow-soft transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-2">
                <ApperIcon name={stat.icon} className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                <span className="text-xs md:text-sm text-surface-500 dark:text-surface-400 font-medium">
                  LIVE
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-surface-600 dark:text-surface-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Feature Component */}
        <MainFeature ref={mainFeatureRef} />

        {/* Quick Actions */}
        <motion.div 
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-6 md:mb-8 text-center">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { 
                icon: "UserPlus", 
                title: "Add Employee", 
                description: "Register new team members with complete profiles",
                color: "from-blue-500 to-blue-600"
              },
              { 
                icon: "Calendar", 
                title: "Track Attendance", 
                description: "Monitor daily check-ins and work hours",
                color: "from-green-500 to-green-600"
              },
              { 
                icon: "BarChart3", 
                title: "Performance Review", 
                description: "Evaluate and rate employee performance",
                color: "from-purple-500 to-purple-600"
              }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                onClick={() => handleQuickAction(action.title)}
                className="group card p-6 hover:shadow-soft cursor-pointer transition-all duration-300"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 * index }}
              >
                <div className={`bg-gradient-to-r ${action.color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <ApperIcon name={action.icon} className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {action.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {action.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Home