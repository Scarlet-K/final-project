import React from 'react';
// import Form from './pages/form';
import Map from './components/map';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPage() {
    return <Map />;
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
