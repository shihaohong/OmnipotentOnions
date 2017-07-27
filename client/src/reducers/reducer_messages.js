import { FETCH_MESSAGES, CREATE_MESSAGE } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case CREATE_MESSAGE:
    var newObj = Object.assign({}, state);
    newObj[action.payload.fake_time] = action.payload;
    return newObj;
  case FETCH_MESSAGES:
    // console.log('reducers/reducers_messages: ', action.payload.data);
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }   
} 