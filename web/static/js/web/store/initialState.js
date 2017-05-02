import _ from "lodash";
const shared = (typeof $shared === 'undefined') ? {} : JSON.parse($shared);

const initialState = {
  header: {
    name: "world"
  },
  cards: {
    filters: {
      pagination: {
        page: 1,
        total_pages: 2
      }
    },
    index: [],
    show: {}
  }
}
export default _.merge(initialState, shared)
