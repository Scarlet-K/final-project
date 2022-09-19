import React from 'react';

export default class Memories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/memento')
      .then(response => response.json())
      .then(entries => this.setState({
        entries,
        isLoading: false
      }));
    // .catch(err => console.err('Fetch failed!', err));
  }

  render() {
    return this.state.isLoading
      ? <p>Loading...</p>
      : <div className="container">
        <div className="row">
          {
            this.state.entries.map(entry => {
              return (
                <div key={entry.entryId} className="col-md">
                  <Entry entry={entry} />
                </div>
              );
            })
          }
        </div>
      </div>;
  }
}

function Entry(props) {
  const { imageUrl, date, location, description } = props.entry;
  return (
    <div className="col">
      <img src={imageUrl}></img>
      <h3>{date}</h3>
      <h2>{location}</h2>
      <p>{description}</p>
    </div>
  );
}
