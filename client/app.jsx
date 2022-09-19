import React from 'react';
import Form from './pages/form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
      <Form />
      </>
    );
  }
}
