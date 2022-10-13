import React from 'react';
import format from 'date-fns/format';

const style = {
  width: '18rem',
  height: '100%'
};

const img = {
  height: '10rem',
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
    return (
      this.state.isLoading
        ? <p>Loading...</p>
        : this.state.entries.length === 0
          ? <div className="container mt-nav pt-3 text-center">
              <p>No entries recorded.</p>
            </div>
          : <div className="container mt-nav pt-3">
              <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
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
  const { entryId, imageUrl, date, placeName } = props.entry;
  const defaultDate = new Date(date);
  const newDate = format(defaultDate, 'MM-dd-yyyy');
  return (
    <div className="card me-3 row-fluid" style={style}>
      <img src={imageUrl} className="rounded-top img-fluid" style={img} />
      <div className="card-body">
        <h5 className="card-title">
          {newDate}
        </h5>
        <p className="card-text">@{placeName}</p>
        <div className="text-end">
          <a href={`#entry?entryId=${entryId}`} className="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  );
}
