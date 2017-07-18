import axios from 'axios';

export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_CHANNELS = 'fetch_channels';
export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_MESSAGE = 'create_message';

export const fetchGroups = function(user) {
  // replace with real ajax request
  // const request = axios.get(``);

  // dummy request
  const request = [
    {
      id: 1,
      name: 'Charming Chameleons'
    },
    {
      id: 2,
      name: 'Tactful Tetherballs'
    },
    {
      id: 3,
      name: 'Omnipotent Onions'
    },
  ];

  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export let fetchChannels = function(group) {
  // replace with real ajax request
  // const request = axios.get(``);

  // dummy request
  const request = [
    {
      id: 1,
      name: 'Shi-Hao\'s Smashing Channel'
    },
    {
      id: 2,
      name: 'Dylan\'s Dynamic Channel'
    },
    {
      id: 3,
      name: 'Peter\'s Poetic Channel'
    },
    {
      id: 4,
      name: 'Gideon\'s Gallant Channel'
    }
  ];

  return {
    type: FETCH_CHANNELS,
    payload: request
  };
};

export let fetchMessages = function(channel) {
  // replace with real ajax request
  // const request = axios.get(``);

  // dummy request
  const request = [
    {
      id: 1,
      user: 'Shi-Hao',
      text: 'Hello friends!'
    },
    {
      id: 2,
      user: 'Peter',
      text: 'What\'s up!'
    },
    {
      id: 3,
      user: 'Dylan',
      text: 'I got the app deployed on Digital Ocean!' 
    },
    {
      id: 4,
      user: 'Gideon',
      text: 'That\'s awesome! Here, have some spam!'  
    }
  ];

  return {
    type: FETCH_MESSAGES,
    payload: request
  };
};

export let createMessage = function(message) {
  // replace with real ajax request
  // const request = axios.post(``);
  const request = {};
  // change this back later
  return {
    type: CREATE_MESSAGE,
    payload: message
  };
};