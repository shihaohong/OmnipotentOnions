import { FETCH_EVENT } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_EVENT: 
    return action.payload.data;
  default:
    return state;
  }
}