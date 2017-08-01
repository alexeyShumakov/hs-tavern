import React from "react";
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

export default (props) => {
  return(
    <nav className="nav has-shadow">
      <div className="container">
        <div className="nav-left">
          <Link to="/" className="nav-item is-brand">
            <h3>HS tavern</h3>
          </Link>
          <div className="nav-item">
            <div className="field">
              <p className="control">
                <input className="input nav-search" type="text" placeholder="Search"/>
              </p>
            </div>
          </div>
        </div>

        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        { props.store.user.is_authenticated ?
          <div  className="nav-right nav-menu">
            <a className="nav-item">
              <figure className="image is-24x24 nav-avatar">
                <img src={props.store.user.avatar} alt="avatar" />
              </figure>
              {props.store.user.name}
            </a>
            <Link to="/my_desks" className="nav-item">
              My desks
            </Link>
            <div className="nav-item">
              <div className="field is-grouped">
                <p className="control">
                  <a onClick={() =>{ axios.delete("/auth/sign_out").then(()=>{ location.reload() }) }}
                    href="#" className="button nav-button">Sign out</a>
                </p>
              </div>
            </div>
          </div>
          :
          <div  className="nav-right nav-menu">
            <div className="nav-item">
              <div className="field is-grouped">
                <p className="control">
                  <a onClick={() =>{ props.actions.setModal(true)
                    }}
                    href="#" className="button nav-button">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        }
        </div>
    </nav>
  )
}
