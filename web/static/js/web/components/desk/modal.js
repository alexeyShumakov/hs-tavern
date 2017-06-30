import React from "react";
import Desk from "./show/desk"

export default class DeskModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
    if (e.keyCode === 27 && this.props.isOpen) {
      this.props.close();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    const {route, store, actions, channel, setDesk, desk, close, setModal, isLogin } = this.props;
    console.log(channel);
    return(
      <div className="modal is-active" onKeyDown={this.handleKeydown}>
        <div className="modal-background" onClick={close}/>
        <div className="modal-content desk__modal">
          <div className="box">
            <Desk
              deleteCallback={()=>{
                let filters = {
                  page: 1,
                  total_pages: 1,
                  keyword: "",
                  player_class: "All",
                  my: true
                }

                actions.deleteDesk(desk.id).then(()=>{
                  actions.setDeskModal(false)
                  actions.setDeskFilters(filters)
                  actions.fetchDesks()
                  route.history.push("/my_desks")
                })

              }}
              route={route}
              store={store}
              actions={actions}
              channel={channel}
              isLogin={isLogin}
              desk={desk}
              update={setDesk}
              setModal={()=>{
                close();
                setModal(true);
            }}/>
          </div>
        </div>
        <button className="modal-close" onClick={close}/>
      </div>
    )
  }
}
