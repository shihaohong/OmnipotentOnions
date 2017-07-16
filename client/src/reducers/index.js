import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import GroupsReducer from './reducer_groups';
import ChannelsReducer from './reducer_channels';
import MessagesReducer from './reducer_messages';

const rootReducer = combineReducers({
  form: formReducer,
  groups: GroupsReducer,
  channels: ChannelsReducer,
  messages: MessagesReducer
});

export default rootReducer;