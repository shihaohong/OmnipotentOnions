import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import OneGroupReducer from './reducer_groups';
import GroupsReducer from './reducer_groups';
import JoinGroupReducer from './reducer_join_group.js';
import ChannelsReducer from './reducer_channels';
import MessagesReducer from './reducer_messages';
import ProfileReducer from './reducer_profile';

const rootReducer = combineReducers({
  form: formReducer,
  group: OneGroupReducer,
  groups: GroupsReducer,
  joinGroup: JoinGroupReducer,
  channels: ChannelsReducer,
  messages: MessagesReducer,
  profile: ProfileReducer
});

export default rootReducer;