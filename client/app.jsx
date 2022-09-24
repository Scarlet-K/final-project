import React from 'react';
import Form from './pages/form';
// import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPage() {
    return <Form />;
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
