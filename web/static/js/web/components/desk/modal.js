import React from "react";

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
    const { desk, close } = this.props;
    return(
      <div className="modal is-active" onKeyDown={this.handleKeydown}>
        <div className="modal-background" onClick={close}/>
        <div className="modal-content">
          <div className="box">
            <div className="columns">
              <div className="column is-three-quarters">
                <div className="box">
                  {desk.title}
                </div>
              </div>
              <div className="column">
                <div className="box"></div>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close" onClick={close}/>
      </div>
    )
  }
}
