import React from 'react';

export default function Nav(props) {

  return (
    <>
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container justify-content-start">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand mx-3" href="#">Memento</a>
        </div>
      </nav>
    </>
  );
}
