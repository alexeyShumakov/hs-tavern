//const shared = (typeof $shared === 'undefined') ? {} : JSON.parse($shared);

const shared = {};
const initialState = {
  header: {
    name: "world"
  }
}
export default Object.assign({}, shared, initialState)
