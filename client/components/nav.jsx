import React from 'react';

export default class Nav extends React.Component {

  onClick() {
    window.location.hash = '#form';
  }

  render() {
    return (
    <>
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container px-3">
          <a className="navbar-brand" href="#">Memento</a>
            <button className="btn btn-primary" type="button" onClick={this.onClick}>
              <i className="fa fa-plus" />
            </button>
        </div>
      </nav>
    </>
    );
  }
}
