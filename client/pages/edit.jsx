import React from 'react';
import Map from '../components/map';
import Auto from '../components/auto';
import format from 'date-fns/format';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      placeName: '',
      latLng: { lat: 0, lng: 0 },
      address: '',
      description: '',
      file: 'images/placeholder-image-square.jpg',
      entry: null
    };
    this.fileInputRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  componentDidMount() {
    fetch(`/api/memento/${this.props.entryId}`)
      .then(res => res.json())
      .then(entry => {
        const { imageUrl, placeName, description, latLng, date, address } = entry;
        const defaultDate = new Date(date);
        const newDate = format(defaultDate, 'yyyy-MM-dd');
        this.setState({
          imageUrl,
          placeName,
          description,
          latLng,
          date: newDate,
          address,
          entry
        });
      });
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const image = this.fileInputRef.current.files[0];
    formData.append('date', this.state.date);
    formData.append('placeName', this.state.placeName);
    formData.append('latLng', JSON.stringify(this.state.latLng));
    formData.append('address', this.state.address);
    formData.append('description', this.state.description);
    formData.append('image', image);
    fetch(`/api/memento/${this.props.entryId}`, {
      method: 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(() => {
        window.location.hash = `#entry?entryId=${this.props.entryId}`;
      })
      .catch(err => console.error('Fetch failed!', err));
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    const lat = this.autocomplete.getPlace().geometry.location.lat();
    const lng = this.autocomplete.getPlace().geometry.location.lng();
    const placeName = this.autocomplete.getPlace().name;
    const address = this.autocomplete.getPlace().formatted_address;
    this.setState({
      placeName,
      latLng: { lat, lng },
      address
    });
  }

  render() {
    if (!this.state.entry) return null;
    return (
      <form onSubmit={this.onSubmit} className="container mt-nav pt-3">
        <div className="row justify-content-center">
          <div className="col px-3">
            <div className="pt-3 image-container">
              <img src={this.state.file} className="rounded img-fluid"></img>
            </div>
            <input
              required
              className="form-control my-2"
              type="file"
              name="image"
              ref={this.fileInputRef}
              onChange={this.onFileChange}
              accept=".png, jpg, .jpeg, .gif"
            ></input>
          </div>
          <div className="col-md px-3">
            <label htmlFor="date" className="px-0 mt-2">Date</label>
            <input
              required
              className="form-control mb-2"
              type="date"
              name="date"
              id="date"
              value={this.state.date}
              onChange={this.onChange}
            ></input>
            <label htmlFor="location" className="px-0 mt-2">Location</label>
            <div>
              <Auto
                value={this.state.address}
                onPlaceChanged={this.onPlaceChanged}
                onChange={this.onChange}
                onLoad={this.onLoad}
              />
              <Map center={this.state.latLng} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col px-3">
            <label htmlFor="description" className="px-0 mt-2">Description</label>
            <textarea
              required
              className="form-control form-control-md"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              rows="4"
              placeholder="Write your message here."
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col px-3">
            <button type="submit" className="btn btn-primary my-3 w-100">SAVE</button>
          </div>
        </div>
      </form>
    );
  }
}
