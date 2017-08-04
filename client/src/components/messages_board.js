import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Label, Image, Header } from 'semantic-ui-react';
import moment from 'moment';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages () {
    var colors = ['blue', 'green', 'violet', 'brown', 'pink', 'yellow', 'purple', 'olive', 'orange'];
    var tempColors = colors.slice();
    var colorMap = {};
    return _.map(this.props.messages, (message, i) => {
      var myMessage = this.props.profileId === message.profile.id;
      if (!tempColors.length) {
        tempColors = colors.slice();
      }
      if (!myMessage && !colorMap[message.profile.id]) {
        var assignedColor = tempColors.pop();
        colorMap[message.profile.id] = assignedColor;
      }
      return myMessage ? (
        <Segment inverted color='teal' tertiary compact key={moment(message.create_at).valueOf()} textAlign='left'> 
          <Label color={'teal'}>
            <Image size='medium' avatar floated='right' spaced='left' src={message.profile.profilePic}/>
            {message.profile.display} <br/> 
            {moment(message.create_at).format('h:mma')}
          </Label>
          <Header floated='right' size='small'>{message.text}</Header>
        </Segment>
      ) : (
        <Segment inverted color={colorMap[message.profile.id]} tertiary compact key={moment(message.create_at).valueOf()} textAlign='left'> 
          <Label color={colorMap[message.profile.id]}>
            <Image size='medium' avatar floated='right' spaced='left' src={message.profile.profilePic}/>
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
      return <div></div>;
    } 
    

    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}
 
export default MessageBoard;
