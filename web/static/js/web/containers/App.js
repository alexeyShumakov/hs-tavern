import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Modal from "../components/modal/Modal";

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
              <h1>Main Content</h1>
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
