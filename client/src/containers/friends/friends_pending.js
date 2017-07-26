import React, { Component } from 'react';
import { fetchFriendRequests, fetchPendingRequests, fetchFriends } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import axios from 'axios';

export class PendingList extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      term: '',
      danger: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
    this.onCancelRequest = this.onCancelRequest.bind(this);
  }

  onAddFriend(e) {
    e.preventDefault();
    if (this.props.profile.email !== this.state.term) {
      let isUserFriend, isUserAlreadyPending;

      isUserFriend = _.reduce(this.props.friends, (bool, user) => {
        if (user.friend.email === this.state.term) {
          return true;
        } else {
          return bool || false;
        }
      }, false);

      if (!isUserFriend) {
        axios.post(`/pendingfriends/sendRequest/${this.props.profile.id}`, {
          emailAddress: this.state.term
        })
          .then(response => {
            console.log('success!');
            this.props.fetchFriendRequests(this.props.profile.id);
            this.setState({
              term: ''
            });
          })
          .catch(err => {
            this.setState({
              danger: 'User not found',
            });
          });
      } else {
        this.setState({
          danger: 'User is already your friend',
          term: ''
        });
      }
    } else {
      this.setState({
        danger: 'You cannot add yourself as a friend',
        term: ''
      });
    }
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value,
      danger: ''
    });
  }

  onCancelRequest(friendId) {
    axios.delete(`/pendingfriends/cancelrequest/${this.props.profile.id}/${friendId}`)
      .then(request => {
        console.log('success!');
        this.props.fetchFriendRequests(this.props.profile.id);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  onAcceptRequest(friendId) {
    console.log(friendId);
    axios.post(`/friendsget/${this.props.profile.id}/${friendId}`)
      .then(request => {
        console.log('success!');
        this.props.fetchFriends(this.props.profile.id);
        this.props.fetchPendingRequests(this.props.profile.id);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  onDeclineRequest(friendId) {
    axios.delete(`/pendingfriends/cancelrequest/${friendId}/${this.props.profile.id}`)
      .then(request => {
        console.log('success!');
        this.props.fetchPendingRequests(this.props.profile.id);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  renderForm() {
    return (
      <div> 
        To add a friend, please enter their email address below and submit
        <form onSubmit={this.onAddFriend}>
          <input
            placeholder='Enter email address here' 
            value={this.state.term}
            onChange={this.onInputChange}
          /> <br/>
          <div className='dangerMessage' style={{color: 'red'}} >{this.state.danger}</div>
          <button>Add a friend</button>
        </form>
      </div>
    );
  }

  renderPendingRequests() {
    return _.map(this.props.pending, request => {
      return (
        <div key={request.id}>
          <div>Name: {request.user.display} </div>
          <div>Email: {request.user.email} </div>
          <button onClick={ () => { this.onAcceptRequest(request.profile_id); } }>Accept</button> 
          <button onClick={ () => { this.onDeclineRequest(request.profile_id); } }>Decline</button><br/>
          -----
        </div>
      );
    });
  }

  renderFriendRequests() {
    return _.map(this.props.requests, request => {
      return (
        <div key={request.friend_id}>
          <div>Name: {request.friend.display} </div>
          <div>Email: {request.friend.email} </div>
          <button onClick={() => { this.onCancelRequest(request.friend_id); }}>Cancel request</button> <br/>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Pending List</h3>
        {this.renderForm()}
        <h4>Pending Requests</h4>
        {this.renderPendingRequests()}
        <h4>Friend Requests</h4>
        {this.renderFriendRequests()}
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