import React from 'react';
// import Home from './pages/home';
import Form from './pages/form';
import Memories from './pages/memories';
import NewEntry from './pages/new-entry';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Form />;
    }
    if (route.path === 'new-entry') {
      const entryId = route.params.get('entryId');
      return <NewEntry entryId={entryId} />;
    }
    return null;
  }

  render() {
    return (
      <>
      <Memories />
      </>
    );
    // : <Form />;
    // return <Home />;
  }
}
