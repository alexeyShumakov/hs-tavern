import React from "react";

export default (props) => {
  return(
    <nav className="nav has-shadow">
      <div className="container">
        <div className="nav-left">
          <a className="nav-item is-brand">
            <h3>HS tavern</h3>
          </a>
        </div>

        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className="nav-right nav-menu">
          <div className="nav-item">
            <div className="field is-grouped">
              <p className="control">
                <a
                  onClick={()=> props.actions.setModal(true)}
                  className="button nav-button" href="#">Sign in </a>
              </p>
              <p className="control">
                <a
                  onClick={()=> props.actions.setModal(true)}
                  href="#" className="button nav-button">Sign up </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
