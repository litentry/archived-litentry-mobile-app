import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import globalStyles from 'src/styles';

export class ErrorBoundary extends React.Component<{}, {hasError: boolean}> {
  constructor(props: {}) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error('ERROR CAUGHT: ');
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Layout style={globalStyles.centeredContainer}>
          <Text>Something went wrong!</Text>
          <Button onPress={() => this.setState({hasError: false})}>
            Try again
          </Button>
        </Layout>
      );
    }

    return this.props.children;
  }
}
