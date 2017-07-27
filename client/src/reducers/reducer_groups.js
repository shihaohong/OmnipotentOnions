import { JOIN_GROUP, FETCH_GROUPS, CREATE_GROUP } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  // console.log('reducer/groups ', action.type);
  switch (action.type) {
  case JOIN_GROUP:
    return action.payload.data;
  case FETCH_GROUPS:
    // console.log('groups fetched');
    return _.mapKeys(action.payload.data, 'id');
  case CREATE_GROUP:
    return action.payload.data;
  default:
    return state;
  }   
}