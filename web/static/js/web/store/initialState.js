import _ from "lodash";
const shared = (typeof $shared === 'undefined') ? {} : JSON.parse($shared);
const local = (typeof $local === 'undefined') ? {} : JSON.parse($local);

const initialState = {
  desks: {
    isOpenModal: false,
    index: [],
    show: {},
    filters: {
      page: 1,
      total_pages: 2,
      keyword: "",
      player_class: "All",
      popularity: "new"
    }
  },
  builder: {
    errors: {},
    isValid: true,
    desk: {
      player_class: "",
      title: "",
      description: "",
      standard: true,
      cards: []
    },
    cards: [],
    filters: {
      player_class: "",
      set: "All",
      keyword: "",
      cost: {min: 0, max: 7},
      collectible: true,
      pagination: {
        page: 1,
        total_pages: 2,
        page_size: 6
      }
    },
  },
  user: {},
  cards: {
    isOpenModal: false,
    isDirtyFilters: false,
    clickCount: 0,
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
    show: {
      comments: []
    }
  }
}
export default _.merge(initialState, shared, local)
