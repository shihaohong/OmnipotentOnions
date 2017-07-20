import React, { Component } from 'react';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages(messages) {
    console.log('MESSAGES in compo/message_board: ', messages);
    return _.map(messages, message => {
      return (
        <Segment key={message.id}> 
          <h4>{message.user}</h4>
          <div>{message.text}</div>
        </Segment>
      );
    });
  }

  render() {
    if (Object.keys(this.props.messages).length === 0) {
      return <div>Loading... </div>;
    } 

    return (
      <div>{this.renderMessages(this.props.messages)}</div>
    );
  }
}
 
export default MessageBoard;