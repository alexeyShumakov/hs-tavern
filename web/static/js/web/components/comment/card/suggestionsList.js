import React from "react";
import _ from "lodash";
import Suggestion from "./suggestion";
import {selectCard} from "../../../editor/decorators/card";

export default (props) => {
  return(
    <div className="suggestions-list box is-paddingless">
      { props.suggestions.map((suggestion)=>{
        return(
          <Suggestion
            clickCallback={()=>{
              const newEditorState = selectCard(props.editorState, suggestion);
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
