import React, { forwardRef } from 'react'

export const Input = forwardRef(({
  type = 'text',
  label,
  error,
  className = '',
  required = false,
  disabled = false,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={inputId}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        className={`
          w-full px-3 py-2 bg-bg border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          text-sm
          ${error ? 'border-destructive focus:ring-destructive/50' : 'border-border'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-xs text-destructive mt-1" id={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export const Textarea = forwardRef(({
  label,
  error,
  className = '',
  required = false,
  disabled = false,
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        className={`
          w-full px-3 py-2 bg-bg border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          text-sm resize-vertical
          ${error ? 'border-destructive focus:ring-destructive/50' : 'border-border'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-xs text-destructive mt-1" id={`${textareaId}-error`}>
          {error}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

