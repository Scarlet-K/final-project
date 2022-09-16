import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      location: '',
      description: ''
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
          description: ''
        });
        this.fileInputRef.current.value = null;
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="container">
        <div className="text-center">
          <img src={this.state.file} className="img-fluid"></img>
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile"></input>
          <label className="custom-file-label" htmlFor="customFile">Choose file</label>
        </div>
        <input
          required
          className="form-control"
          type="file"
          name="image"
          ref={this.fileInputRef}
          onChange={this.handleFileChange}
          accept=".png, jpg, .jpeg, .gif"
        ></input>
        <input
          required
          className="form-control"
          type="date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        ></input>
        <input
          required
          className="form-control"
          type="text"
          name="location"
          value={this.state.location}
          onChange={this.handleChange}
        ></input>
        <textarea
          required
          className="form-control form-control-sm"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          rows="4"
        ></textarea>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}
