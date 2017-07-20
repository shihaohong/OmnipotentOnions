import { FETCH_GROUPS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_GROUPS:
    console.log('reduers/reducer_groups PAYLOAD.DATA', action.payload.data);
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }   
}