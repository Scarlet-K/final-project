import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      location: '',
      description: '',
      file: 'images/placeholder-image-square.jpg'
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const image = this.fileInputRef.current.files[0];
    formData.append('date', this.state.date);
    formData.append('location', this.state.location);
    formData.append('description', this.state.description);
    formData.append('image', image);
    fetch('/api/memento', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(body => {
        this.setState({
          date: '',
          location: '',
          description: '',
          file: 'images/placeholder-image-square.jpg'
        });
        this.fileInputRef.current.value = null;
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="container mx-5-center">
        <div className="row px-5 justify-content-center">
          <div className="col-md px-3">
            <div className="pt-3 image-container">
              <img src={this.state.file} className="rounded img-fluid"></img>
            </div>
            <input
              required
              className="form-control my-2"
              type="file"
              name="image"
              ref={this.fileInputRef}
              onChange={this.handleFileChange}
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
              onChange={this.handleChange}
            ></input>
            <label htmlFor="location" className="px-0 mt-2">Location</label>
            <input
              required
              className="form-control mb-2"
              type="text"
              name="location"
              id="location"
              value={this.state.location}
              onChange={this.handleChange}
            ></input>
          </div>
        </div>
        <div className="row px-5">
          <div className="col-md px-3">
            <label htmlFor="description" className="px-0 mt-2">Description</label>
            <textarea
              required
              className="form-control form-control-md"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              rows="4"
              placeholder="Write your message here."
            ></textarea>
          </div>
        </div>
        <div className="row px-5">
          <div className="col-md px-3">
            <button type="submit" className="btn btn-primary my-3 w-100">SAVE</button>
          </div>
        </div>
      </form>
    );
  }
}
