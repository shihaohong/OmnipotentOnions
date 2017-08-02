import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Label, Image, Header } from 'semantic-ui-react';
var moment = require('moment');

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages () {
    return _.map(this.props.messages, message => {
      var myMessage = this.props.profileId === message.profile.id;
      const colors = ['red', 'orange', 'yellow', 'green', 'olive', 'blue', 'pink', 'violet', 'purple'];
      var randColor = colors[Math.floor(Math.random() * colors.length)];
      return myMessage ? (
        <Segment compact inverted color='teal' tertiary compact key={moment(message.create_at).valueOf()} textAlign='right'> 
          <Label as='a' color={'teal'}>
            <Image size='medium' floated='right' avatar spaced='left' src={message.profile.profilePic}/>
            {message.profile.display} <br/> 
            {moment(message.create_at).format('h:mma')}
          </Label>
          <Header floated='left' size='small'>{message.text}</Header>
        </Segment>
      ) : (
        <Segment compact inverted color={randColor} tertiary key={moment(message.create_at).valueOf()} textAlign='left'> 
          <Label as='a' color={randColor}>
            <Image size='medium' avatar floated='left' spaced='right' src={message.profile.profilePic}/>
            {message.profile.display} <br/>
            {moment(message.create_at).format('h:mma')}
          </Label>
          <Header floated='right' size='small'>{message.text}</Header>
        </Segment>
      );
    });
  }

  render() {
    if (Object.keys(this.props.messages).length === 0) {
      return <div>Loading... </div>;
    } 
    

    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}
 
export default MessageBoard;