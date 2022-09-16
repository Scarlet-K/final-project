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
      <form onSubmit={this.handleSubmit}>
        <img src={this.state.file}></img>
        <input
          required
          type="file"
          name="image"
          ref={this.fileInputRef}
          onChange={this.handleFileChange}
          accept=".png, jpg, .jpeg, .gif"
        ></input>
        <input
          required
          type="date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        ></input>
        <input
          required
          type="text"
          name="location"
          value={this.state.location}
          onChange={this.handleChange}
        ></input>
        <textarea
          required
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        ></textarea>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}
