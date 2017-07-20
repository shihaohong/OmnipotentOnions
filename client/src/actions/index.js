import axios from 'axios';

export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_CHANNELS = 'fetch_channels';
export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_MESSAGE = 'create_message';
export const FETCH_PROFILE = 'fetch_profile';

export const fetchGroups = function(user) {
  const request = axios.get(`/profileGroups/${user.id}`);
  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export let fetchChannels = function(groupId) {
  const request = axios.get(`/channels/${groupId}`);
  return {
    type: FETCH_CHANNELS,
    payload: request
  };
};

export let fetchMessages = function(channel) {
  // replace with real ajax request
  // const request = axios.get(``);

  // dummy request
  // const request = [
  //   {
  //     id: 1,
  //     user: 'Shi-Hao',
  //     text: 'Hello friends!'
  //   },
  //   {
  //     id: 2,
  //     user: 'Peter',
  //     text: 'What\'s up!'
  //   },
  //   {
  //     id: 3,
  //     user: 'Dylan',
  //     text: 'I got the app deployed on Digital Ocean!' 
  //   },
  //   {
  //     id: 4,
  //     user: 'Gideon',
  //     text: 'That\'s awesome! Here, have some spam!'  
  //   }
  // ];

  // return {
  //   type: FETCH_MESSAGES,
  //   payload: request
  // };
};

export let createMessage = function(message) {
  // replace with real ajax request
  // const request = axios.post(``);
  // axios.post(`/messages/${}`)
  // const request = {};
  // // change this back later
  // return {
  //   type: CREATE_MESSAGE,
  //   payload: message
  // };
};

export let fetchProfile = function(profile) {
  return {
    type: FETCH_PROFILE,
    payload: profile
  };
}; 