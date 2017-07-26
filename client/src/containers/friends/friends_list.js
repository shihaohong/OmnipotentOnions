import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions';
import _ from 'lodash';
import axios from 'axios';

export class FriendsList extends Component {

  constructor(props) {
    super(props);

    this.onDeleteFriend = this.onDeleteFriend.bind(this);
  }

  onDeleteFriend(friendId) {
    axios.delete(`/friendsget/${this.props.profile.id}/${friendId}`)
      .then(success => {
        console.log(success);
        this.props.fetchFriends(this.props.profile.id);
      })
      .catch(err => {
        console.error('err', err);
      });
  }

  renderFriends() {
    return _.map(this.props.friends, (friend) => {
      return (
        <div key={friend.id}>
          <div> Name: {friend.friend.display} </div>
          <div> Email: {friend.friend.email} </div>
          <button onClick={ () => { this.onDeleteFriend(friend.friend_id); } }>Delete friend</button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Friends List</h3>
        {this.renderFriends()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return { 
    profile: state.profile,
    friends: state.friends 
  };
};

export default connect(mapStateToProps, { fetchFriends })(FriendsList);