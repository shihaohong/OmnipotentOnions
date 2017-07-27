import { FETCH_PROFILE, UPDATE_PROFILE_BIO, UPDATE_NICKNAME } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_PROFILE:
    return action.payload;
  case UPDATE_PROFILE_BIO:
    return action.payload.data;
  case UPDATE_NICKNAME:
    return action.payload.data;
  default:
    return state;
  }
}