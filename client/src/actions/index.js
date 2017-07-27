import axios from 'axios';

export const FETCH_PROFILES = 'fetch_profiles';
export const FETCH_PROFILE = 'fetch_profile';
export const UPDATE_PROFILE_BIO = 'update_profile_bio';
export const UPDATE_NICKNAME = 'update_nickname';

export const FETCH_GROUPS = 'fetch_groups';
export const JOIN_GROUP = 'join_group';
export const CREATE_GROUP = 'create_group';

export const FETCH_CHANNELS = 'fetch_channels';
export const CREATE_CHANNEL = 'create_channel';

export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_MESSAGE = 'create_message';

export const FETCH_FRIENDS = 'fetch_friends';

export const FETCH_PENDING_REQUESTS = 'fetch_pending_requests';
export const FETCH_FRIEND_REQUESTS = 'fetch_friend_requests';

export const FETCH_EVENTS = 'fetch_events';

// export const fetchProfiles = function(user) {
//   const request = axios.get(`/profileGroups/${user.id}`);

//   return {
//     type: FETCH_PROFILES,
//     payload: request
//   };
// };

export let fetchProfile = function(profile) {
  return {
    type: FETCH_PROFILE,
    payload: profile
  };
}; 

export let updateProfileBio = function(aboutMe, profileId) {
  const request = axios.post(`/profiles/${profileId}?bio=${aboutMe}`);
  return {
    type: UPDATE_PROFILE_BIO,
    payload: request
  };
};

export let updateNickname = function(nickname, profileId) {
  console.log('i got to updateNicknameBio ', nickname, profileId);
  const request = axios.post(`/profiles/${profileId}?nickname=${nickname}`);
  return {
    type: UPDATE_NICKNAME,
    payload: request
  };
};

/* -----------------------GROUPS ------------------------------------- */
export const fetchGroups = function(user) {
  const request = axios.get(`/profileGroups/${user.id}`);
  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export let createGroup = function(group, profile, shortID) {
  console.log(group);
  const request = axios.post(`/groups/createGroup/${group}?id=${profile}&shortID=${shortID}`);
  return {
    type: CREATE_GROUP,
    payload: request
  };
};

export const joinGroup = function(shortid, profile) {
  const request = axios.post(`/profileGroups/joinGroup/${shortid}?id=${profile}`);
  return {
    type: JOIN_GROUP,
    payload: request
  };
};

/* -----------------------CHANNELS ------------------------------------- */

export let fetchChannels = function(groupId) {
  const request = axios.get(`/channels/${groupId}`);
  return {
    type: FETCH_CHANNELS,
    payload: request
  };
};

export let createChannel = function(group) {
  const request = axios.post(`/channels/${group.groupId}?name=${group.channelName}`);
  return {
    type: CREATE_CHANNEL,
    payload: request
  };
}; 

/* -----------------------EVENTS ------------------------------------- */

export let fetchEvents = function(groupId) {

  const request = [
    {
      id: 2,
      date: 'May 25, 2018',
      name: 'Lecture w/ Luke Davis',
      address: '944 Market St',
      time: '8pm - 9pm',
      group_id: 1,
      creator: 1
    },
    {
      id: 4,
      date: 'July 25, 1994',
      name: 'Lecture w/ Fred',
      address: '944 Market Street',
      time: '2pm - 4pm',
      group_id: 1,
      creator: 1
    }
  ];

  return {
    type: FETCH_EVENTS,
    payload: request
  };
};

/* -----------------------MESSAGES ------------------------------------- */

export let fetchMessages = function(channelId) {
  // replace with real ajax request
  const request = axios.get(`/messages/${channelId}`);
  return {
    type: FETCH_MESSAGES,
    payload: request
  };
};

export let createMessage = function(message) {
  return {
    type: CREATE_MESSAGE,
    payload: message
  };
}; 

/* Friends List Action Creators */

export let fetchFriends = function(profileId) {
  // hard-coded friends
  // var friends = [
  //   {
  //     id: 12,
  //     first: 'John',
  //     last: 'Doe',
  //     display: 'John Doe',
  //     email: 'johndoe@anonymous.com'
  //   },
  //   {
  //     id: 25,
  //     first: 'Janet',
  //     last: 'Doe',
  //     display: 'Janet Doe',
  //     email: 'janetdoe@anonymous.com'
  //   },
  //   {
  //     id: 36,
  //     first: 'Evets',
  //     last: 'Bojs',
  //     display: 'Evets Bojs',
  //     email: 'elppa@elppa.com'
  //   },
  //   {
  //     id: 77,
  //     first: 'Derf',
  //     last: 'Gnudriz',
  //     display: 'Derf Gnudriz',
  //     email: 'hr@$hr.com'
  //   }
  // ];
  let friends = axios.get(`/friendsget/${profileId}`);

  return {
    type: FETCH_FRIENDS,
    payload: friends
  };
};

export let fetchPendingRequests = function(profileId) {
  // var pending = [
  //   {
  //     id: 15,
  //     first: 'Peter',
  //     last: 'Tan',
  //     display: 'Peter Tan',
  //     email: 'pete@anonymous.com'
  //   },
  //   {
  //     id: 126,
  //     first: 'Dylan',
  //     last: 'Mayoral',
  //     display: 'Dylan Mayoral',
  //     email: 'cooldancer@anonymous.com'
  //   }
  // ];
  var pending = axios.get(`/pendingfriends/pending/${profileId}`);

  return {
    type: FETCH_PENDING_REQUESTS,
    payload: pending
  };
};

export let fetchFriendRequests = function(profileId) {
  var requests = axios.get(`/pendingfriends/requests/${profileId}`);

  return {
    type: FETCH_FRIEND_REQUESTS,
    payload: requests
  };
};