import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          // Make a nice error boundary page that has a button to navigate back to home
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Something went wrong</h1>
                <p className="text-xl text-gray-800 dark:text-gray-200">Please try again later</p>
                <button
                    type="button"
                    className="px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    onClick={() => {
                        this.setState({ hasError: false });
                    }}
                >
                    Try again?
                </button>
            </div>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary