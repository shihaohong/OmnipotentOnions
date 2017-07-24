import React, { Component } from 'react';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate (date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime;
  }

  renderMessages (messages) {
    console.log('compo/message_board: ', messages);
    return _.map(messages, message => {
      return (
        <Segment key={message.id}> 
          <span>
            <h4>{message.profile.display}</h4>
            <h8>{message.create_at}</h8>
          </span>
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