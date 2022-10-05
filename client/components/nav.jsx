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
            <a className="btn btn-primary" href="form">
              <i className="fa fa-plus" />
            </a>
        </div>
      </nav>
    </>
    );
  }
}
