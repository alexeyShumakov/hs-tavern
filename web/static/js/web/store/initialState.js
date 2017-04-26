import _ from "lodash";
const shared = (typeof $shared === 'undefined') ? {} : JSON.parse($shared);

const initialState = {
  header: {
    name: "world"
  },
  cards: {
    index: [],
    show: {}
  }
}
export default _.merge(shared, initialState)
