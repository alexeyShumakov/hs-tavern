//const shared = (typeof $shared === 'undefined') ? {} : JSON.parse($shared);

const shared = {};
const initialState = {
  header: {
    name: "world"
  }
}

console.log(shared, initialState)
export default Object.assign({}, shared, initialState)
