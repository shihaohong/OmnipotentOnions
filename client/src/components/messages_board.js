import React, { Component } from 'react';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Object.keys(this.props.messages).length === 0) {
      return <div>Loading... </div>;
    } 

    const messages = _.map(this.props.messages, message => {
      return (
        <Segment key={message.id}> 
          <h4>{message.user}</h4>
          <div>{message.text}</div>
        </Segment>
      );
    });

    return (
      <div>{messages}</div>
    );
  }
}

export default MessageBoard;