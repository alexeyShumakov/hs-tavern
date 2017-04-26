import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import * as appActions from '../actions';

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Modal from "../components/modal/Modal";
import Cards from "../components/cards/index";

const App = (props) => {
  const { store, actions, children } = props;
  return(
    <div>
      <Modal
        setModal={actions.setModal}
        isOpen={store.modal.isOpen}
      />
      <Header {...{store, actions}}/>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-2 is-hidden-mobile">
              <Sidebar {...{store, actions}}/>
            </div>
            <div className="column">
              <Route path="/cards"
                render={route => (<Cards {...{route, store, actions}}/>)}
              />
              <Route exact path="/"
                render={() => ( <h3>Home</h3>)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function mapStateToProps(state) {
  return { store: state }
}

function mpaDispatchToProps(dispatch) {
  return { actions: bindActionCreators(appActions, dispatch) }
}

export default connect(mapStateToProps, mpaDispatchToProps)(App)
