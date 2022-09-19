import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: 'images/placeholder-image-square.jpg'
    };
    this.fileInputRef = React.createRef();
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  render() {
    return (
    <form className="container mx-5-center">
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
      </div>
    </form>
    );
  }
}
