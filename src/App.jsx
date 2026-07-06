import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ToastContainer from './components/Toast'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import JobDetails from './pages/JobDetails'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-screen bg-app-gradient">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}
