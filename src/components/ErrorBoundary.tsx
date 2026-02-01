import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleAcknowledgment } from '@/utils/acknowledgmentHelpers';
import { playUISound } from '@/utils/soundGenerator';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    playUISound('on', 'avatar', 0.5);
    handleAcknowledgment('error-reset');
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    playUISound('on', 'avatar', 0.5);
    handleAcknowledgment('error-reload');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-onyx text-mist p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-flamingo" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-mist/70">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-mist/50 hover:text-mist/70">
                    Error details
                  </summary>
                  <pre className="mt-2 text-xs text-flamingo/80 bg-flamingo/10 p-4 rounded overflow-auto max-h-40">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="border-mist/30 hover:bg-mist/10"
              >
                Try Again
              </Button>
              <Button
                onClick={this.handleReload}
                className="glass-heavy glass-heavy-hover text-mist"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
