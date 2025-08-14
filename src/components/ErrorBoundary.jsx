import React, { Component } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from './Button'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-surface rounded-lg border border-border shadow-card">
          <div className="p-4 bg-destructive/10 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          
          <p className="text-muted-foreground mb-6 max-w-md">
            We're sorry, but an error occurred while rendering this component.
          </p>
          
          <div className="space-y-4 w-full max-w-md">
            <Button 
              onClick={this.handleReset}
              className="w-full"
            >
              Try Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Reload Page
            </Button>
            
            {this.props.fallback}
          </div>
          
          {process.env.NODE_ENV !== 'production' && (
            <div className="mt-6 p-4 bg-bg rounded-md text-left w-full max-w-md overflow-auto text-xs">
              <p className="font-semibold mb-2">Error Details:</p>
              <pre className="whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
              {this.state.errorInfo && (
                <>
                  <p className="font-semibold mt-4 mb-2">Component Stack:</p>
                  <pre className="whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

