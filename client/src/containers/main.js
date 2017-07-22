import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchChannels } from '../actions';

import { Segment } from 'semantic-ui-react';

import Groups from './groups';
import Channels from './channels';
import Messages from './messages';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChannel: false,
      showMessages: false
    };
    this.onHandleChannel = this.onHandleChannel.bind(this);
  }
  componentWillMount() {
    this.props.fetchProfile(window.myUser);    
  }

  onHandleChannel (e) {
    if (this.state.showChannel === false && this.state.groupId === undefined) {
      this.props.fetchChannels(e.target.value);
      this.setState({
        showChannel: !this.state.showChannel,
        groupId: e.target.value
      });
    } else if (this.state.showChannel && this.state.groupId === e.target.value) {
      this.setState({
        showChannel: !this.state.showChannel,
        groupId: undefined
      });
    } else if (this.state.showChannel && this.state.groupId !== e.target.value) {
      this.props.fetchChannels(e.target.value);
      this.setState({
        groupId: e.target.value
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Connect, {window.myUser.display}</h1>
        <Segment.Group horizontal>
          <Segment><Groups profile={window.myUser} handleChannel={this.onHandleChannel}/></Segment>
          {
            this.state.showChannel ? <Segment><Channels groupId={this.state.groupId}/></Segment> : null
          }
        </Segment.Group>
      </div>
    );
  }  
}
// <Segment><Messages /></Segment> 
export default connect(null, { fetchProfile, fetchChannels} )(Main);