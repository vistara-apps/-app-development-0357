import React from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export function Modal({ isOpen, onClose, title, children, size = 'default' }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`bg-surface rounded-lg shadow-card border border-border w-full mx-4 ${sizeClasses[size]} animate-slide`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}