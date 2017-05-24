import React from "react";

export default class CardsModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
    props.channel.on("card_click", payload => {
    })
  }


  close() {
    let { card, closeCardsModal, clear } = this.props;
    closeCardsModal(card);
    window.history.pushState(null, null, "/cards");
    clear();
  }

  handleKeydown(e) {
    if (e.keyCode === 27 && this.props.isOpen) {
      this.close();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    const { cc, isOpen, card, channel } = this.props;
    return(
      <div>
        { isOpen &&
          <div className="modal is-active" onKeyDown={this.handleKeydown}>
            <div className="modal-background" onClick={this.close}/>
            <div className="modal-content">
              <div className="box"
                onClick={()=> {
                  channel.push("card_click", {card_id: card.id})
                }}
              >
                {card.title}
              </div>
            </div>
            <button className="modal-close" onClick={this.close}/>
          </div>
        }
      </div>
    )
  }
}
