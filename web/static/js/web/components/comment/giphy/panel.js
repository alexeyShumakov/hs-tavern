import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class GiphyPanel extends React.Component {
  constructor(props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this);
  }

  outsideClick(e) {
    const {isShow, hidePanel} = this.props;
    const el = this.container;
    if(!el.contains(e.target) && isShow) hidePanel();
  }

  componentWillMount(){
    document.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.outsideClick)
  }

  render() {
    return(
      <div ref={ref => {this.container = ref}} className="box giphy-box">
        <h2>giphy</h2>
        <div className="is-multiline columns is-gapless">
        </div>
      </div>
    )
  }
}

GiphyPanel.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hidePanel: PropTypes.func.isRequired
}
