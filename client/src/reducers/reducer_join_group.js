import { FETCH_PROFILES_GROUPS, JOIN_GROUP } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_PROFILES_GROUPS:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }   
}