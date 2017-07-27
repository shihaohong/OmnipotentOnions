import { JOIN, UNJOIN, FETCH_ALL_ATTENDEES } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case JOIN:
    return _.mapKeys(action.payload.data, 'id');
  case UNJOIN:
    return _.mapKeys(action.payload.data, 'id');
  case FETCH_ALL_ATTENDEES:
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}