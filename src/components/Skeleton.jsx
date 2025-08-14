import React from 'react'

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-border/50 rounded-md ${className}`}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 1, className = '', ...props }) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 shadow-card ${className}`}
      {...props}
    >
      <div className="flex items-start space-x-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-5 w-3/4" />
          <SkeletonText lines={2} />
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonChatPreview({ className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-4 shadow-card ${className}`}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonTierCard({ className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 shadow-card ${className}`}
      {...props}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <SkeletonText lines={2} />
        <div className="flex space-x-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
}

