import React from 'react';
import Moment from 'react-moment';

const style = {
  width: '18rem',
  height: '100%'
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
    // console.log(this.state.entries);
    fetch('/api/memento')
      .then(response => response.json())
      .then(entries => this.setState({
        entries,
        isLoading: false
      }))
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {
    // console.log(this.state.entries);
    return (
      this.state.isLoading
        ? <p>Loading...</p>
        : <div className="container mt-nav pt-3">
        <div className="d-flex flex-wrap justify-content-between">
          {
            this.state.entries.map(entry => {
              return (
                <div key={entry.entryId} className="mt-3">
                  <Entry entry={entry} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

function Entry(props) {
  const { entryId, imageUrl, date, address } = props.entry;
  return (
    <div className="card my-3" style={style}>
      <img src={imageUrl} className="rounded-top" style={img} />
      <div className="card-body">
        <h5 className="card-title">
          <Moment format="MM-DD-YYYY">
            {date}
          </Moment>
        </h5>
        <p className="card-text">{address}</p>
        <div className="text-end">
          <a href={`#entry?entryId=${entryId}`} className="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  );
}
