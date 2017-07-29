import { JOIN_GROUP, FETCH_GROUPS, CREATE_GROUP, LEAVE_GROUP } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case JOIN_GROUP:
    return action.payload.data;
  case FETCH_GROUPS:
    return _.mapKeys(action.payload.data, 'id');
  case CREATE_GROUP:
    return action.payload.data;
  case LEAVE_GROUP:
    return action.payload.data;
  default:
    return state;
  }   
}