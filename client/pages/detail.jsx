import React from 'react';
import Map from '../components/map';
import format from 'date-fns/format';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null,
      dropdown: false
    };
  }

  componentDidMount() {
    fetch(`/api/memento/${this.props.entryId}`)
      .then(res => res.json())
      .then(entry => this.setState({ entry }));
  }

  render() {
    if (!this.state.entry) return null;
    const { imageUrl, date, placeName, description, latLng } = this.state.entry;
    const defaultDate = new Date(date);
    const newDate = format(defaultDate, 'MM-dd-yyyy');
    return (
      <>
        <div className="container mt-nav">
          <div className="row">
            <div className="col px-3">
              <div className="mt-3 image-container">
                <img src={imageUrl} className="rounded img-fluid"></img>
              </div>
              <div>
                <Map center={latLng} />
              </div>
            </div>
            <div className="col-md px-3">
              <div className="row mt-2 justify-between align-items-center">
                <h2 className="col my-1">
                  {newDate}
                </h2>
                <span className="col my-1 text-end">
                  <div className="dropdown">
                    <button className="btn px-3" data-bs-toggle="dropdown">
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" href={`#edit?entryId=${this.props.entryId}`}>Edit</a></li>
                      <li><a className="dropdown-item" href="#">Remove</a></li>
                    </ul>
                  </div>
                </span>
              </div>
              <p className="px-0 mt-2">@{placeName}</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
