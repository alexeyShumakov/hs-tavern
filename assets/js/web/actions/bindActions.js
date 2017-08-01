import {bindActionCreators} from "redux";
import * as appActions from "./index";
import store from "../store/store";

export default bindActionCreators(appActions, store.dispatch);
