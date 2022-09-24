import React from 'react';
import Moment from 'react-moment';

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
      }))
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {
    return this.state.isLoading
      ? <p>Loading...</p>
      : <div className="container">
        <div className="d-flex flex-md-row flex-wrap">
          {
            this.state.entries.map(entry => {
              return (
                <div key={entry.entryId} className="p-2">
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
    <div>
      <div className="image-container">
        <img src={imageUrl} className="rounded"></img>
      </div>
      <Moment format="MM-DD-YYYY" className="h3">
        {date}
      </Moment>
      <div>
        <p>{location}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
