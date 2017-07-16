import { FETCH_GROUPS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_GROUPS:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }   
}