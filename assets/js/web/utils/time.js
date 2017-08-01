import React from "react";
import Moment from "moment";

function setTime(time) {
  let localTime = Moment.utc(time).local();
  return localTime.fromNow();
}

export default class CardContent extends React.Component {
  constructor(props) {
    super(props);
    let time = setTime(props.time);
    this.state = {time};
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({time: setTime(this.props.time)})
  }

  render() {
    return(
      <span>{this.state.time} </span>
    )
  }
}
