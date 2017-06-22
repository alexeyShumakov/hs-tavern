import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import * as appActions from '../actions';

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Modal from "../components/modal/Modal";
import Cards from "../components/cards/index/index";
import Card from "../components/cards/show";
import CardsModal from "../components/cards/modal/modal";
import Builder from "../components/builder/builder";
import ClassBuilder from "../components/builder/classBuilder";
import DeskIndex from "../components/desk/index";
import DeskModal from "../components/desk/modal";
import DeskShow from "../components/desk/show/show";

const App = (props) => {
  const { store, actions, children } = props;
  const deskChannel = store.desks.index.find((desk)=>{
    return desk.id === store.desks.show.id
  })
  return(
    <div>
      { store.desks.isOpenModal &&
          <DeskModal
            actions={actions}
            store={store}
            channel={deskChannel.channel}
            desk={store.desks.show}
            isOpen={store.desks.isOpenModal}
            setModal={actions.setModal}
            setDesk={actions.setDesk}
            isLogin={store.user.is_authenticated}
            close={()=> {
              actions.setDesk({});
              actions.setDeskModal(false)
              window.history.back();
            }}
          />
      }
      { store.cards.isOpenModal &&
        <CardsModal
          store={store}
          actions={actions}
          channel={store.cards.channel}
          clear={actions.clearCard}
          closeCardsModal={actions.closeCardsModal}
          isOpen={store.cards.isOpenModal}
          card={store.cards.show}
        />
      }
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
              <Route exact path="/desks"
                render={route => (<DeskIndex {...{route, store, actions}}/>)}
              />
              <Route exact path="/desks/:deskId"
                render={route => (<DeskShow {...{route, store, actions}}/>)}
              />
              <Route exact path="/cards/:cardId"
                render={route => (<Card {...{route, store, actions}}/>)}
              />
              <Route exact path="/builder"
                render={route => (<Builder {...{route, store, actions}}/>)}
              />
              <Route exact path="/builder/:heroClass"
                render={route => (<ClassBuilder {...{route, store, actions}}/>)}
              />
              <Route exact path="/cards"
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
