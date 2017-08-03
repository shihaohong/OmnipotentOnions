import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, createMessage } from '../actions';

import io from 'socket.io-client';

import VideoChat from './video_chat';
import MessageBoard from '../components/messages_board';
import MessageInput from './messages_input';
import { Segment, Header } from 'semantic-ui-react';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoChat: false,
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
    
    document.getElementById('joinVideoChat').style.display = 'none';
  }

  onHandleVideoChatLeave() {
    this.setState({
      showVideoChat: false
    });

    io().emit('part', 'test');
    io().emit('disconnect');    

    document.getElementById('joinVideoChat').style.display = 'initial';    
  }

  render() {
    return (
      <div>
        <div id='video-chat-fronter'>
          <Segment inverted color='grey'>
            <Header inverted color='teal' size='large'> {this.props.channelId ? this.props.channel[this.props.channelId].name : 'Select a Group & Channel...' } </Header>
            <button onClick={this.onHandleVideoChatJoin} id='joinVideoChat'>Join Video Chat</button>
            {
              this.state.showVideoChat ? <VideoChat toggleVideo={this.onHandleVideoChatLeave} shortID={this.props.channelId}/> : null
            }
          </Segment>
        </div>
        <div id='message-scroll'>
          <MessageBoard 
            socket={this.props.socket}
            messages={this.props.messages}
            channelId={this.props.channelId}
            profileId={this.props.profile.id}
          />
        </div>
        <div id='message-input'>
          <MessageInput
            socket={this.props.socket}
            channelId={this.props.channelId}
            profile={this.props.profile}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { messages: state.messages, channel: state.channels, profile: state.profile };
};

export default connect(mapStateToProps, { fetchMessages, createMessage })(Messages);