import React, { createContext, useContext, useState, useCallback } from 'react'
import { ToastContainer } from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, options = {}) => {
    const id = Date.now().toString()
    const toast = {
      id,
      message,
      variant: options.variant || 'info',
      duration: options.duration || 3000
    }
    
    setToasts(prev => [...prev, toast])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'success' })
  }, [addToast])

  const showError = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'error' })
  }, [addToast])

  const showInfo = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'info' })
  }, [addToast])

  const value = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

