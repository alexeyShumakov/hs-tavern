import React from "react";

export default class CardsModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.close = this.close.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
  }


  close() {
    this.props.setModal(false);
    window.history.pushState(null, null, "/cards");
    this.props.clear();
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
    const { isOpen } = this.props;
    return(
      <div>
        { isOpen &&
          <div className="modal is-active" onKeyDown={this.handleKeydown}>
            <div className="modal-background" onClick={this.close}/>
            <div className="modal-content">
              <div className="box">
                {this.props.card.title}
              </div>
            </div>
            <button className="modal-close" onClick={this.close}/>
          </div>
        }
      </div>
    )
  }
}
