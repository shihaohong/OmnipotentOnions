import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Divider } from 'semantic-ui-react';


class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages (messages) {
    return _.map(messages, message => {
      return (
        <Segment key={message.id || message.fake_time}> 
          <strong>{message.profile.display}</strong>
          <em>{Date.parse(message.create_at || message.fake_time)}</em>
          <Divider fitted />
          {message.text}
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

  // formatDate (date) {
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime;
  // }
}
 
export default MessageBoard;