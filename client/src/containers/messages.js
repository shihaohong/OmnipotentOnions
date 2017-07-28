import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, createMessage } from '../actions';
import axios from 'axios';

import MessageBoard from '../components/messages_board';
import MessageInput from './messages_input';
import { Segment } from 'semantic-ui-react';

class Messages extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.socket.on('display-message', message => {
      if (message.channel_id === this.props.channelId) {
        this.props.createMessage(message);
      }
      axios.post(`/messages/${message.channel_id}`, {text: message.text, profileId: message.profile_id});
    });
  }

  render() {
    return (
      <div> 
        <h2> Messages </h2>
        <Segment.Group>
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