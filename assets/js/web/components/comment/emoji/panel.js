import React from "react";
import emojione from "emojione";
import _ from "lodash";
import emojioneList from "emojione/emoji.json"
const emojioneListDiversity = _.filter(emojioneList, {'diversity': null, 'gender': null})
const orderedEmojiList = _.orderBy(emojioneListDiversity, ['order'])

export default class EmojiPanel extends React.Component {
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
      <div ref={ref => {this.container = ref}} className= "box emoji-box">
        <div className="is-multiline columns is-gapless">
          {
            _.map(orderedEmojiList,((emoji, key)=>{
              const imgPath = `${emojione.defaultPathPNG}${emojione.emojiSize}/${emoji.code_points.base}.png`
              return <div key={key} className="column is-2">
                <span
                  className="image is-32x32 emoji-box__item"
                  onClick={()=>{this.props.insertEmoji(emoji.shortname)}}
                >
                  <img alt={key} src={imgPath}/>
                </span>
              </div>
            }))
          }
        </div>
      </div>
    )
  }
}
