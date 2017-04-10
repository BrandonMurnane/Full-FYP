import React from 'react';

export function connectFormHOC(connectorInitialData) {
  return function wrapComponent(WrappedComponent) {
    const wrappedComponentName = WrappedComponent.displayName ||
                                 WrappedComponent.name || 'Component';

    return class FormConnect extends React.Component{
      static displayName= `withForm(${wrappedComponentName})`;

      static propTypes = {
        initialData: React.PropTypes.oneOfType([
          React.PropTypes.object,
          React.PropTypes.func
        ]),
        form: React.PropTypes.object.isRequired
      }

      constructor(props) {
        super(props);
        // initial data can be passed form props or connector configuration
        const lastInitialData = props.initialData || connectorInitialData || {};

        // store copy of initial data in form state
        this.state = { lastInitialData };
      }

      componentWillMount() {
        // initializes form on load
        this.props.form.handleLoad(this.state.lastInitialData);
      }

      componentWillReceiveProps(nextProps) {
        const { initialData } = nextProps;

        // reinitializes form if initialData props are updated by parent components
        if (initialData !== this.state.lastInitialData && initialData) {
          this.setState({ lastInitialData: initialData });
          this.props.form.handleLoad(initialData);
        }
      }

      render() {
        const { ...props } = this.props;
        if (!this.props.form.isLoaded) return null;

        return <WrappedComponent {...props} />;
      }
    };
  };
}
