import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case CREATE_EVENT:
    return _.mapKeys(action.payload.data, 'id');
  case DELETE_EVENT:
    return _.mapKeys(action.payload.data, 'id');
  case FETCH_EVENTS:
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}