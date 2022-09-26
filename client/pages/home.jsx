import React from 'react';
import Moment from 'react-moment';

const style = {
  width: '18rem'
};

const img = {
  height: '16rem',
  objectFit: 'cover'
};

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
      : <div className="container mt-nav pt-4">
        <div className="d-flex flex-wrap justify-content-between">
          {
            this.state.entries.map(entry => {
              return (
                <div key={entry.entryId}>
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
  const { imageUrl, date, address } = props.entry;
  return (
    <div className="card mt-3" style={style}>
      <img src={imageUrl} className="rounded-top" style={img} />
      <div className="card-body">
        <h5 className="card-title">
          <Moment format="MM-DD-YYYY">
            {date}
          </Moment>
        </h5>
        <p className="card-text">{address}</p>
        <div className="text-end">
          <a href="#" className="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  );
}