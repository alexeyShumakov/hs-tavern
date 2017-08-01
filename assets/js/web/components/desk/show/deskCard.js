import React from "react";

export default class DeskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShow: false}
  }

  render() {
    const {card } = this.props;
    return(
      <div
        onMouseEnter={()=>{
          this.setState({isShow:true})
        }}
        onMouseLeave={()=>{
          this.setState({isShow:false})
        }}
        key={card.id}
        className="media builder__desk-card">

        {this.state.isShow &&
          <div className="box builder__desk-card-img">
            <img src={card.img}/>
          </div>
        }
        <div className="media-left">
          <b className="builder__desk-card-cost">{card.cost}</b>
        </div>
        <div className="media-content">
         {card.title}
        </div>
        <div className="media-right">
          {card.rarity == "Legendary" ?
              <span className="icon is-small">
                <i className="fa fa-star"></i>
              </span>
            : card.count
          }
        </div>
      </div>
    )
  }
}
