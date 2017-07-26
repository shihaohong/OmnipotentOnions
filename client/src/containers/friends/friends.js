import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchFriends, fetchPendingRequests, fetchFriendRequests } from '../../actions';
import { bindActionCreators } from 'redux';

import FriendsList from './friends_list';
import PendingList from './friends_pending';


export class Friends extends Component {
  constructor(props) {
    super(props);
    this.props.fetchProfile(myUser);
    this.props.fetchFriends(myUser.id); 
    this.props.fetchPendingRequests(myUser.id); 
    this.props.fetchFriendRequests(myUser.id);
  }

  render() {
    return (
      <div>
        <div> <FriendsList /> </div>
        <div> <PendingList /> </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { profile: state.profile };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ 
    fetchProfile,
    fetchFriends,
    fetchPendingRequests, 
    fetchFriendRequests
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);