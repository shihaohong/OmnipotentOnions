import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
import _ from 'lodash';

import NewChannel from './new_channel';
import VideoChat from './video_chat';

import { Segment } from 'semantic-ui-react';

export class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideoChat: false 
    };

    this.onHandleVideoChatJoin = this.onHandleVideoChatJoin.bind(this);
    this.onHandleVideoChatLeave = this.onHandleVideoChatLeave.bind(this);
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      this.props.socket.emit('subscribe', channel.id);
      return (
        <Segment key={channel.id}>
          <button value={channel.id} onClick={this.props.handleMessage}>{channel.name}</button>
        </Segment>
      );
    });
  }

  onHandleVideoChatJoin() {
    this.setState({
      showVideoChat: true
    });
  }

  onHandleVideoChatLeave() {
    this.setState({
      showVideoChat: false
    });
  }

  render() {
    return (
      <div>
        <h2>Channels</h2>
        <button onClick={this.onHandleVideoChatJoin}>Join Video Chat</button>
        <button onClick={this.onHandleVideoChatLeave}>Leave Video Chat</button>
        {
          this.state.showVideoChat ? <Segment><VideoChat /></Segment> : null
        }
        <Segment.Group>
          {this.renderChannels()}
          <NewChannel groupId={this.props.groupId}/>
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { channels: state.channels };
};

export default connect(mapStateToProps, { fetchChannels })(Channels);