import React from "react";
import _ from "lodash";
import Suggestion from "./suggestion";
import {selectMention} from "../../../editor/decorators/mention";

export default (props) => {
  return(
    <div className="suggestions-list box is-paddingless">
      { props.suggestions.map((suggestion)=>{
        return(
          <Suggestion
            clickCallback={()=>{
              const newEditorState = selectMention(props.editorState, suggestion);
              props.setNewEditorState(newEditorState);
            }}
            key={suggestion.id}
            suggestion={suggestion}
        />)
      })
      }
    </div>
  )
}
