import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";

export default class GiphyPanel extends React.Component {
  constructor(props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this);
    this.state = {giffs: [], keyword: ""}
    this.search = this.search.bind(this)
    this.debouceSearch = _.debounce(this.search, 300)
  }

  search(keyword, offset) {
    axios.get("/media/search", {params: {keyword: keyword, offset: offset}}).then((response)=>{
      this.setState({giffs: response.data.data})
    })
  }

  outsideClick(e) {
    const {isShow, hidePanel} = this.props;
    const el = this.container;
    if(!el.contains(e.target) && isShow) hidePanel();
  }

  componentWillMount(){
    axios.get("/media/search", {params: {keyword: "hearthstone"}}).then((response)=>{
      this.setState({giffs: response.data.data})
    })
    document.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.outsideClick)
  }

  render() {
    return(
      <nav ref={ref => {this.container = ref}} className="box giphy-box">
        <div className="field">
          <p className="control has-icons-left">
            <input
              value={this.state.keyword}
              onChange={(e) => {
                this.setState({keyword: e.target.value})
                this.debouceSearch(e.target.value, 0);
              }}
              className="input is-small" type="text" placeholder="Search"/>
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>

          <div className="is-multiline columns is-gapless">
            {
              this.state.giffs.map((giff) =>{
                return <div key={giff.slug} className="giphy-box__item">
                  <img alt="" src={giff.images.fixed_width.webp}/>
                </div>
              })
            }
          </div>
      </nav>
    )
  }
}

GiphyPanel.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hidePanel: PropTypes.func.isRequired
}
