import React from 'react';
import Moment from 'react-moment';
import Map from '../components/map';

export default class Detail extends React.Component {
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
    const { imageUrl, date, placeName, description, latLng } = this.state.entry;
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
                  <Moment format="MM/DD/YYYY">{date}</Moment>
                </h2>
                <span className="col my-1 text-end">
                  <button className="btn px-3"><i className="fa fa-ellipsis-v"></i></button>
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
