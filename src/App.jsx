import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import EmployeeSelfService from './components/EmployeeSelfService'
import PerformanceMetrics from './components/PerformanceMetrics'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-white via-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 transition-colors duration-300">
          <Routes>
            <Route 
              path="/" 
              element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} 
            />
            <Route 
              path="/employee-portal" 
              element={<EmployeeSelfService isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} 
            />
            <Route 
              path="/performance-metrics" 
              element={<PerformanceMetrics isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDarkMode ? 'dark' : 'light'}
            className="mt-12"
          />
        </div>
      </Router>
    </div>
  )
}

export default App