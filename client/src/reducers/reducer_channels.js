import { FETCH_CHANNELS, CREATE_CHANNEL, EMPTY_CHANNELS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CHANNELS:
    return _.mapKeys(action.payload.data, 'id');
  case CREATE_CHANNEL:
    return _.mapKeys(action.payload.data, 'id');
  case EMPTY_CHANNELS:
    console.log('INSIDE REDUCERS');
    return _.mapKeys(action.payload.data, 'id');
  default: 
    return state;
  }   
}