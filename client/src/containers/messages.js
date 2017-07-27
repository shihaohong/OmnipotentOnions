import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, createMessage } from '../actions';
import axios from 'axios';
import io from 'socket.io-client';
// try not to hardcode socket later
const socket = io('http://localhost:8080');

import MessageBoard from '../components/messages_board';
import MessageInput from './messages_input';
import { Segment } from 'semantic-ui-react';

class Messages extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // socket.join(this.props.channelId);
    socket.on('return-message', message => {
      this.props.createMessage(message);
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
              messages={this.props.messages}
            />
          </Segment>
          <Segment>
            <MessageInput
              socket={socket}
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