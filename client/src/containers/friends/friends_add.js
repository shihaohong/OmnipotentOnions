import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Input, Segment } from 'semantic-ui-react';

export class FriendsAdd extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      term: '',
      danger: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value,
      danger: ''
    });
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

  renderForm() {
    return (
      <div> 
        <form onSubmit={this.onAddFriend}>
          <Segment>
            <Input
              id='friend-add-input'
              placeholder='Enter an email address' 
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <Button id='friend-add-button' color='teal'>Add a friend</Button>
            <div className='dangerMessage' style={{color: 'red'}} >{this.state.danger}</div>
          </Segment>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>Add Friend</h3>
        <div>You can add friends with their email address.</div> <br/>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStatetoProps = function(state) {
  return { 
    profile: state.profile,
    friends: state.friends
  };
};

export default connect(mapStatetoProps, null)(FriendsAdd);