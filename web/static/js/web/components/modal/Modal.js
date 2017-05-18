import React from "react";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
  }


  close() {
    this.props.setModal(false);
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
                <h3 className="title is-4">Sign in with social network</h3>
                <a className="button is-primary is-outlined"
                  onClick={()=>{
                    window.open('/auth/facebook', "auth", "width=600,height=600")
                  }}
                >
                  <span className="icon">
                    <i className="fa fa-facebook"
                    ></i>
                  </span>
                </a>
              </div>
            </div>
            <button className="modal-close" onClick={this.close}/>
          </div>
        }
      </div>
    )
  }
}
