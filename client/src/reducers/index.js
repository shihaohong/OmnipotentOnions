import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import GroupsReducer from './reducer_groups';
import ChannelsReducer from './reducer_channels';
import MessagesReducer from './reducer_messages';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  form: formReducer,
  groups: GroupsReducer,
  channels: ChannelsReducer,
  messages: MessagesReducer,
  user: UserReducer
});

export default rootReducer;