import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-neu-light dark:shadow-neu-dark">
            <ApperIcon name="AlertTriangle" className="h-12 w-12 text-white" />
          </div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-7xl font-bold text-surface-900 dark:text-surface-100 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          404
        </motion.h1>

        <motion.h2 
          className="text-2xl md:text-3xl font-semibold text-surface-700 dark:text-surface-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p 
          className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back to managing your workforce.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 btn-primary text-base md:text-lg px-6 py-3 hover:shadow-soft group"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        <motion.div 
          className="mt-8 text-sm text-surface-500 dark:text-surface-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Need help? Contact support for assistance.
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound