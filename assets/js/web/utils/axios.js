import axios from "axios";
const shared = typeof($shared) !== 'undefined' && JSON.parse($shared);
export default axios.create({
  headers: {
    'X-CSRF-Token': shared && shared.user.csrf_token,
    'Authorization': shared && shared.user.token
  }
});
