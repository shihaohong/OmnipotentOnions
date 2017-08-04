import React, { Component } from 'react';
import { fetchFriendRequests, fetchPendingRequests, fetchFriends } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Segment, Image, Header } from 'semantic-ui-react';

import _ from 'lodash';
import axios from 'axios';

export class PendingList extends Component {

  constructor(props) {
    super(props);

    this.onCancelRequest = this.onCancelRequest.bind(this);
  }

  onCancelRequest(friendId) {
    axios.delete(`/pendingfriends/cancelrequest/${this.props.profile.id}/${friendId}`)
      .then(request => {
        // console.log('success!');
        this.props.fetchFriendRequests(this.props.profile.id);
      })
      .catch(err => {
        // console.log('err: ', err);
      });
  }

  onAcceptRequest(friendId) {
    // console.log(friendId);
    axios.post(`/friendsget/${this.props.profile.id}/${friendId}`)
      .then(request => {
        console.log('success!');
        this.props.fetchFriends(this.props.profile.id);
        this.props.fetchPendingRequests(this.props.profile.id);
      })
      .catch(err => {
        // console.log('err: ', err);
      });
  }

  onDeclineRequest(friendId) {
    axios.delete(`/pendingfriends/cancelrequest/${friendId}/${this.props.profile.id}`)
      .then(request => {
        // console.log('success!');
        this.props.fetchPendingRequests(this.props.profile.id);
      })
      .catch(err => {
        // console.log('err: ', err);
      });
  }

  renderPendingRequests() {
    return _.map(this.props.pending, request => {
      return (
        <Segment key={request.id}>
          <div className='friend-list-div'>
            <Image 
              className='friend-list-profile-pic'
              src={request.user.profilePic} 
              shape='circular'
            />
            <div className='friend-list-data'>

              <Button 
                className='friend-list-button' 
                color='teal'
                onClick={ () => { this.onAcceptRequest(request.profile_id); } }
              >Accept</Button> 

              <Button 
                className='friend-list-button' 
                onClick={ () => { this.onDeclineRequest(request.profile_id); } }
              >Decline</Button>

              <strong>Name:</strong> {request.user.display} <br/>
              <strong>Email:</strong> {request.user.email} <br/>
            </div>
          </div>
        </Segment>
      );
    });
  }

  renderFriendRequests() {
    return _.map(this.props.requests, request => {
      return (
        <Segment key={request.friend_id}>
          <div className='friend-list-div'>
            <Image 
              className='friend-list-profile-pic'
              src={request.friend.profilePic} 
              shape='circular'
            />
            <div className='friend-list-data'>

              <Button 
                className='friend-list-button' 
                onClick={() => { this.onCancelRequest(request.friend_id); }}
              >Cancel Request</Button>

              <strong>Name:</strong> {request.friend.display} <br />
              <strong>Email:</strong> {request.friend.email} <br />
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
          <Header inverted color='teal' size='large'> Pending Requests </Header>
        </Segment>
        <Segment.Group>
          {this.renderPendingRequests()}
        </Segment.Group>
        <div id='chat-bg-color'></div>
        <Segment inverted>
          <Header inverted color='teal' size='large'> Friend Requests </Header>
        </Segment>
        <Segment.Group>
          {this.renderFriendRequests()}
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { 
    pending: state.pending, 
    requests: state.requests,
    profile: state.profile,
    friends: state.friends
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ 
    fetchFriends,
    fetchPendingRequests, 
    fetchFriendRequests
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingList);