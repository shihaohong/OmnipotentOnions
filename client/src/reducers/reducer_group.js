import { FETCH_ONE_GROUP } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_ONE_GROUP:
    return action.payload.data;
  default:
    return state;
  }   
}