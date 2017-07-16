import { FETCH_CHANNELS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CHANNELS:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }   
}