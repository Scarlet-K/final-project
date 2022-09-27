import React from 'react';

export default class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null
    };
  }

  componentDidMount() {
    fetch(`/api/memento/${this.props.entryId}`)
      .then(res => res.json())
      .then(entry => this.setState({ entry }));
  }

  render() {
    if (!this.state.entry) return null;
    const { date, location, description } = this.state.entry;
    return (
      <>
        <div>{date}</div>
        <div>{location}</div>
        <div>{description}</div>
      </>
    );
  }
}
