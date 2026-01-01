"use client";

import { Component, ReactNode } from "react";
import { Alert, Stack, Text, Button } from "@mantine/core";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Stack gap="md" p="md">
            <Alert color="red" title="Error">
              {this.state.error?.message || "Something went wrong"}
            </Alert>
            <Button
              onClick={() => window.location.reload()}
              variant="light"
            >
              Reload Page
            </Button>
          </Stack>
        )
      );
    }

    return this.props.children;
  }
}
