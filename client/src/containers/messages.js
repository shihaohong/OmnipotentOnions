import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, createMessage } from '../actions';

import io from 'socket.io-client';

import VideoChat from './video_chat';
import MessageBoard from '../components/messages_board';
import MessageInput from './messages_input';
import { Segment } from 'semantic-ui-react';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoChat: false 
    };

    this.onHandleVideoChatJoin = this.onHandleVideoChatJoin.bind(this);
    this.onHandleVideoChatLeave = this.onHandleVideoChatLeave.bind(this);
  }
  
  componentDidMount() {
    this.props.socket.on('display-message', message => {
      if (message.channel_id === this.props.channelId) {
        this.props.createMessage(message);
      }
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
        <h2> Messages </h2>
        <Segment.Group>
          <Segment>
            <button onClick={this.onHandleVideoChatJoin}>Join Video Chat</button>
            {
              this.state.showVideoChat ? <VideoChat toggleVideo={this.onHandleVideoChatLeave} shortID={this.props.channelId}/> : null
            }
          </Segment>
          <Segment>
            <MessageBoard 
              socket={this.props.socket}
              messages={this.props.messages}
              channelId={this.props.channelId}
            />
          </Segment>
          <Segment>
            <MessageInput
              socket={this.props.socket}
              channelId={this.props.channelId}
            />
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { messages: state.messages, profile: state.profile, channel: state.channels };
};

export default connect(mapStateToProps, { fetchMessages, createMessage })(Messages);