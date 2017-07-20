import channelsReducer from '../src/reducers/reducer_channels';
import groupsReducer from '../src/reducers/reducer_groups';
import messagesReducer from '../src/reducers/reducer_messages';
import profileReducer from '../src/reducers/reducer_profile';

describe('channels reducer', () => {
  it('should return the initial state', () => {
    expect(channelsReducer(undefined, {})).toEqual({});
  });
});

describe('groups reducer', () => {
  it('should return the initial state', () => {
    expect(groupsReducer(undefined, {})).toEqual({});
  });
});

describe('messages reducer', () => {
  it('should return the initial state', () => {
    expect(messagesReducer(undefined, {})).toEqual({});
  });
});

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual({});
  });
});