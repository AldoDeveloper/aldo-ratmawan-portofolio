import React from 'react';

interface PropsErrorBoundary{
   message?: string,
   children?: React.ReactNode
}

interface StateErrorBoundary{
    hasError?: boolean
}

class ErrorBoundary extends React.Component<PropsErrorBoundary, StateErrorBoundary> {
    constructor(props: PropsErrorBoundary) {
      super(props)
      this.state = { hasError: false }
    }

    public static getDerivedStateFromError(error : any) {
      return { hasError: true }
    }

    public componentDidCatch(error : Error, errorInfo : any) {
      console.log({ error, errorInfo })
    }

    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h2>Oops, there is an error!</h2>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}>
              Try again?
            </button>
          </div>
        )
      }
      return this.props.children
    }
  }
   
  export default ErrorBoundary