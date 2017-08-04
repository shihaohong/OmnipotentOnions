import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions';
import _ from 'lodash';
import axios from 'axios';
import { Image, Button, Segment, Header } from 'semantic-ui-react';

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
          <div className='friend-list-div'>
            <Image
              className='friend-list-profile-pic'
              src={friend.friend.profilePic} 
              shape='circular'
            />
            <div className='friend-list-data'>
              <Button className='friend-list-button' color='red' onClick={ () => { this.onDeleteFriend(friend.friend_id); } }>Delete Friend</Button>
              <strong>Name:</strong> <br/>
              {friend.friend.display} <br/>
              <strong>Email:</strong> <br/>
              {friend.friend.email}
            </div>
          </div>
        </Segment>
      );
    }); 
  }

  render() {
    return (
      <div>
        <div id='chat-bg-color'></div>
        <Segment inverted>
          <Header inverted color='teal' size='large'> Friends List </Header>
        </Segment>
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