import React from 'react';

export default class GipgyAttachment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: JSON.parse(props.data)};
  }
  render() {
    const {state} = this;
    const style = {
      width: state.data.width + 'px',
      height: state.data.height + 'px'
    }
    return(
      <div>
        <img
          style={style}
          src={state.data.url}/>
      </div>
    )
  }
}
