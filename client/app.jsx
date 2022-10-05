import React from 'react';
import Form from './pages/form';
import Memories from './pages/memories';
import Nav from './components/nav';
import parseRoute from './lib/parse-route';
import Detail from './pages/detail';

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
      return <Memories />;
    }
    if (route.path === 'form') {
      return <Form />;
    }
    if (route.path === 'entry') {
      const entryId = route.params.get('entryId');
      return <Detail entryId={entryId} />;
    }
  }

  render() {
    return (
      <>
        <Nav />
        {this.renderPage()}
      </>
    );
  }
}
