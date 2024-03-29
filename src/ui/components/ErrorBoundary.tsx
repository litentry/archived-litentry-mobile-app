import React from 'react';
import {Button, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles from '@ui/styles';

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.error('ERROR CAUGHT: ');
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout style={globalStyles.fillCenter}>
          <Text>Something went wrong!</Text>
          <Button onPress={() => this.setState({hasError: false})}>Try again</Button>
        </Layout>
      );
    }

    return this.props.children;
  }
}
