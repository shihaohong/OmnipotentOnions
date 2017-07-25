import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Divider } from 'semantic-ui-react';

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
        <div>
          <Segment key={message.id}> 
            <strong>{message.profile_id}</strong>
            <em>{/*<h8>{message.create_at}</h8>*/} 12:55pm </em>
            <Divider fitted />
            {message.text}
          </Segment>
        </div>
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