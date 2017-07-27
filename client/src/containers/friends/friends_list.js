import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions';
import _ from 'lodash';
import axios from 'axios';
import { Button, Segment } from 'semantic-ui-react';

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
        <Segment key={friend.id}>
          <img src={friend.friend.profilePic} />
          <div> <strong>Name:</strong> {friend.friend.display} </div>
          <div> <strong>Email:</strong> {friend.friend.email} </div>
          <Button color='red' onClick={ () => { this.onDeleteFriend(friend.friend_id); } }>Delete friend</Button>
        </Segment>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Friends List</h3>
        <Segment.Group>
          {this.renderFriends()}
        </Segment.Group>
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