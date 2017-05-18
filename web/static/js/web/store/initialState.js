import _ from "lodash";
const shared = (typeof $shared === 'undefined') ? {} : JSON.parse($shared);
const local = (typeof $local === 'undefined') ? {} : JSON.parse($local);

const initialState = {
  user: {},
  cards: {
    isOpenModal: false,
    isDirtyFilters: false,
    filters: {
      rarity: null,
      player_class: "All",
      race: "All",
      set: "All",
      keyword: "",
      cost: [0,7],
      attack: [0,7],
      health: [0,7],
      collectible: true,
      pagination: {
        page: 1,
        total_pages: 2
      }
    },
    index: [],
    show: {}
  }
}
export default _.merge(initialState, shared, local)
