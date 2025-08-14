import React, { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export function Toast({ 
  id, 
  message, 
  variant = 'info', 
  duration = 3000, 
  onRemove 
}) {
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onRemove(id)
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [id, duration, onRemove])
  
  const variantStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      text: 'text-red-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      text: 'text-blue-800'
    }
  }
  
  const styles = variantStyles[variant] || variantStyles.info
  
  return (
    <div 
      className={`
        flex items-center justify-between p-4 rounded-lg shadow-md
        border ${styles.border} ${styles.bg}
        animate-slide-in-right
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center space-x-3">
        {styles.icon}
        <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
      </div>
      
      <button
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded-full"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-3 z-50 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          onRemove={removeToast}
        />
      ))}
    </div>
  )
}

