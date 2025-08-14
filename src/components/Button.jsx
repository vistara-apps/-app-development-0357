import React from 'react'

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  disabled = false,
  onClick,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-accent text-white hover:bg-accent/90',
    secondary: 'bg-border text-primary hover:bg-border/80',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
    outline: 'border border-border bg-transparent hover:bg-accent hover:text-white',
    ghost: 'hover:bg-accent/10 hover:text-accent'
  }
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}