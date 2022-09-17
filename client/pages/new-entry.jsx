import React from 'react';

export default class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null
    };
  }

  componentDidMount() {
    fetch(`/api/memento/${this.entries.entryId}`)
      .then(res => res.json())
      .then(entry => this.setState({ entry }));
  }

  render() {
    if (!this.state.entries) return null;
    const { date, location, description } = this.state.entries;
    return (
      <>
      <div>${date}</div>
      <div>${location}</div>
      <div>${description}</div>
      </>
    );
  }
}
