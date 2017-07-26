import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";
import Waypoint from 'react-waypoint';

export default class GiphyPanel extends React.Component {
  constructor(props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this);
    this.state = {giffs: [], keyword: "", isLoading: true, offset: 0}
    this.search = this.search.bind(this)
    this.debouceSearch = _.debounce(this.search, 300)
  }

  search(keyword, offset) {
    this.setState({isLoading: true})
    axios.get("/media/search", {params: {keyword: keyword, offset: offset}}).then((response)=>{
      const {giffs} = this.state;
      this.setState({giffs: [...giffs, ...response.data.data], isLoading: false, offset: offset + 25})
    })
  }

  outsideClick(e) {
    const {isShow, hidePanel} = this.props;
    const el = this.container;
    if(!el.contains(e.target) && isShow) hidePanel();
  }

  componentWillMount(){
    this.search('hearthstone', 0);
    document.addEventListener('click', this.outsideClick)
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.outsideClick)
  }

  render() {
    return(
      <nav ref={ref => {this.container = ref}} className="box giphy-box">
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              value={this.state.keyword}
              onChange={(e) => {
                this.setState({keyword: e.target.value, offset: 0, giffs: []})
                this.debouceSearch(e.target.value, 0);
              }}
              className="input is-small" type="text" placeholder="Search"/>
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
            { this.state.isLoading &&
              <span className="icon is-small is-right">
                <i className="fa fa-spinner fa-spin"></i>
              </span>
            }
          </p>
        </div>

        <div className="giphy-box__giffs">
          <div className="is-multiline columns is-gapless">
            {
              this.state.giffs.map((giff) =>{
                const style = {
                  width: `${giff.images.fixed_width.width}px`,
                  height: `${giff.images.fixed_width.height}px`
                }
                return <div key={giff.slug} className="giphy-box__item">
                  <img
                    onClick={()=> {
                      const giffData = {
                        url: giff.images.fixed_width.url,
                        width: giff.images.fixed_width.width,
                        height: giff.images.fixed_width.height,
                      }
                      this.props.attachMedia('giphy', giffData);
                      this.props.hidePanel();
                    }}
                    style={style}
                    src={giff.images.fixed_width.webp}/>
                </div>
              })
            }
          </div>
          <Waypoint onEnter={()=> {
              const {offset, keyword, isLoading, giffs} = this.state;
              !isLoading && !_.isEmpty(giffs) && !_.isEmpty(keyword) && this.search(keyword, offset);
          }}/>
        </div>
      </nav>
    )
  }
}

GiphyPanel.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hidePanel: PropTypes.func.isRequired,
  attachMedia: PropTypes.func.isRequired,
}
