import axios from 'axios';

export const FETCH_PROFILES = 'fetch_profiles';
export const FETCH_PROFILE = 'fetch_profile';
export const UPDATE_PROFILE_BIO = 'update_profile_bio';
export const UPDATE_NICKNAME = 'update_nickname';

export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_ONE_GROUP = 'fetch_one_group';
export const JOIN_GROUP = 'join_group';
export const CREATE_GROUP = 'create_group';
export const LEAVE_GROUP = 'leave_group';

export const FETCH_CHANNELS = 'fetch_channels';
export const CREATE_CHANNEL = 'create_channel';

export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_MESSAGE = 'create_message';

export const FETCH_FRIENDS = 'fetch_friends';

export const FETCH_PENDING_REQUESTS = 'fetch_pending_requests';
export const FETCH_FRIEND_REQUESTS = 'fetch_friend_requests';

export const FETCH_EVENTS = 'fetch_events';
export const FETCH_EVENT = 'fetch_event';
export const CREATE_EVENT = 'create_event';
export const DELETE_EVENT = 'delete_event';

export const JOIN_EVENT = 'join_event';
export const UNJOIN_EVENT = 'unjoin_evnet';
export const FETCH_ALL_ATTENDEES = 'fetch_all_attendees';
/* -----------------------PROFILE ------------------------------------- */

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

export const fetchOneGroup = function(group_id) {
  console.log('im in fetchOneGroup ', group_id);
  const request = axios.get(`/groups/fetchOneGroup/${group_id}`);
  return {
    type: FETCH_ONE_GROUP,
    payload: request
  };
};

export let createGroup = function(group, profile_id, shortID) {
  console.log(group, profile_id, shortID);
  const request = axios.post(`/groups/createGroup/${group}?id=${profile_id}&shortID=${shortID}`);
  return {
    type: CREATE_GROUP,
    payload: request
  };
};

export const joinGroup = function(shortID, profile) {
  const request = axios.post(`/profileGroups/joinGroup/${shortID}?id=${profile}`);
  return {
    type: JOIN_GROUP,
    payload: request
  };
};

export let leaveGroup = function(profile_groups_id, profile_id) {
  const request = axios.post(`/profileGroups/leaveGroup?id=${profile_groups_id}&profile_id=${profile_id}`);
  return {
    type: LEAVE_GROUP,
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

export let createChannel = function(channel, shortID) {
  const request = axios.post(`/channels/${channel.name}?group_id=${channel.group_id}&shortID=${shortID}`);
  return {
    type: CREATE_CHANNEL,
    payload: request
  };
}; 


/* -----------------------MESSAGES ------------------------------------- */

export let fetchMessages = function(channelId) {
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

/* -----------------------FRIENDS------------------------------------- */

export let fetchFriends = function(profileId) {
  let friends = axios.get(`/friendsget/${profileId}`);

  return {
    type: FETCH_FRIENDS,
    payload: friends
  };
};

export let fetchPendingRequests = function(profileId) {
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

/* -----------------------EVENTS------------------------------------- */
export let createEvent = function(reqBody, groupId) {
  console.log('create event with these ', reqBody, groupId);
  let createEvent = axios.post(`/events/${groupId}`, reqBody);
  return {
    type: CREATE_EVENT,
    payload: createEvent
  };
};

export let deleteEvent = function(eventId, groupId) {
  let deleteEvent = axios.delete(`/events/${groupId}`, { eventId: eventId });
  return {
    type: DELETE_EVENT,
    payload: deleteEvent
  };
};

export let fetchEvents = function(groupId) {
  let events = axios.get(`/events/${groupId}`);
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

export let fetchEvent = function(groupId, eventId) {
  let event = axios.get(`/events/${groupId}/${eventId}`);
  return {
    type: FETCH_EVENT,
    payload: event
  };
};

/* -----------------------ATTENDANCES------------------------------------- */

export let joinEvent = function(eventId, profileId) {
  let join = axios.post(`/attendnace/${eventId}`, { profileId: profileId});
  return {
    type: JOIN_EVENT,
    payload: join
  };
};

export let unjoinEvent = function(eventId, profileId) {
  let unjoin = axios.delete(`/attendnace/${eventId}`, { profileId: profileId });
  return {
    type: UNJOIN_EVENT,
    payload: unjoin
  };
};

export let fetchAttendees = function(eventId) {
  let fetchAttendees = axios.get(`/attendance/${eventId}`);
  return {
    type: FETCH_ALL_ATTENDEES,
    payload: fetchAttendees
  };
};