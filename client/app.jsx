import React from 'react';
// import Home from './pages/home';
// import Form from './pages/form';
import Memories from './pages/memories';
// import New from './pages/new-entries';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Memories />;
    // : <Form />;
    // return <Home />;
  }
}
