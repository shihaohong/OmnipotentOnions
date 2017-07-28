import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchChannels, fetchMessages } from '../actions';

import { Segment } from 'semantic-ui-react';

import Groups from './groups';
import Channels from './channels';
import Messages from './messages';

import Events from './events/events';
import CreateEvent from './events/createEvent';
import EventDetails from './events/eventDetails';
import GroupEvents from './events/groupEvents';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChannel: false,
      showMessages: false,
      showEvents: false,
      showGroups: true,
      showGroupEvents: false,
      showCreateEvents: false,
      showEventDetails: false,
      eventId: null
    };
    this.onHandleChannel = this.onHandleChannel.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleEvents = this.onHandleEvents.bind(this);
    this.onHandleGroups = this.onHandleGroups.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleEventDetails = this.handleEventDetails.bind(this);
    this.handleGroupEvents = this.handleGroupEvents.bind(this);
  }
  componentWillMount() {
    this.props.fetchProfile(window.myUser);    
  }

  onHandleChannel (e) {
    if (this.state.showChannel === false && this.state.groupId === undefined) {
      this.props.fetchChannels(e.target.value);
      this.setState({
        showChannel: !this.state.showChannel,
        groupId: e.target.value
      });
    } else if (this.state.showChannel && this.state.groupId === e.target.value) {
      if (this.state.showMessages) {
        this.setState({
          showChannel: !this.state.showChannel,
          groupId: undefined,
          showMessages: !this.state.showMessages,
          channelId: undefined
        });
      } else {
        this.setState({
          showChannel: !this.state.showChannel,
          groupId: undefined
        });       
      }
    } else if (this.state.showChannel && this.state.groupId !== e.target.value && this.state.showMessages) {
      this.props.fetchChannels(e.target.value);
      this.setState({
        groupId: e.target.value,
        showMessages: !this.state.showMessages,
        channelId: undefined
      });
    } else if (this.state.showChannel && this.state.groupId !== e.target.value) {
      this.props.fetchChannels(e.target.value);
      this.setState({
        groupId: e.target.value
      });
    }
  }

  onHandleMessage(e) {
    if (this.state.showChannel && this.state.channelId === undefined && this.state.showMessages === false) {
      this.props.fetchMessages(e.target.value);
      this.setState({
        showMessages: !this.state.showMessages,
        channelId: e.target.value
      });
    } else if (this.state.showChannel && this.state.showMessages && this.state.channelId === e.target.value) {
      this.setState({
        showMessages: !this.state.showMessages,
        channelId: undefined
      });
    } else if (this.state.showChannel && this.state.showMessages && this.state.channelId !== e.target.value) {
      this.props.fetchMessages(e.target.value);      
      this.setState({
        channelId: e.target.value
      });
    }
  }

  onHandleEvents() {
    this.setState({
      showChannel: false,
      showMessages: false,
      showEvents: true,
      showGroups: false,
    });
  }

  onHandleGroups() {
    this.setState({
      showEvents: false,
      showGroups: true,
      showGroupEvents: false,
      showCreateEvents: false,
      showEventDetails: false,
    });
  }

  handleGroupEvents(e) {
    // show Group Events and should have some actions
    // need edge cases
    console.log('main handlegroup ', e.target.value);
    this.setState({
      showGroupEvents: !this.state.showGroupEvents,
      groupId: e.target.value
    });
  }

  handleCreateEvent(e) {
    // need edge cases
    this.setState({
      showCreateEvents: !this.state.showCreateEvents,
      groupId: e.target.value
    });

  }

  handleEventDetails(eventId) {
    this.setState({
      showEventDetails: !this.state.showEventDetails,
      eventId: eventId
    });
  }

  render() {
    return (
      <div>
        {console.log('main.js, the props, ' + console.log(this))}
        <h1>Welcome to Connect, {window.myUser.display}</h1>
        <Segment.Group horizontal>
          {
            this.state.showGroups ? <Segment><Groups profile={window.myUser} handleChannel={this.onHandleChannel} showEvents={this.onHandleEvents}/></Segment> : null
          }          
          {
            this.state.showChannel ? <Segment><Channels socket={socket} groupId={this.state.groupId} handleMessage={this.onHandleMessage}/></Segment> : null
          }
          {
            this.state.showMessages ? <Segment><Messages socket={socket} channelId={this.state.channelId}/></Segment> : null
          }


          {
            this.state.showEvents ? <Segment><Events showGroups={this.onHandleGroups} groupEvents={this.handleGroupEvents}/></Segment> : null
          }
          {
            this.state.showGroupEvents ? <Segment><GroupEvents groupId={this.state.groupId} handleEventDetails={this.handleEventDetails}/></Segment> : null
          }
          {
            this.state.showEventDetails ? <Segment><EventDetails eventId={this.state.eventId} /></Segment> : null
          }
          {
            this.state.showCreateEvents ? <Segment><CreateEvent showCreateEvents={this.handleCreateEvent} groupId={this.state.groupId}/></Segment> : null
          }
        </Segment.Group>
      </div>
    );
  }  
}
export default connect(null, { fetchProfile, fetchChannels, fetchMessages} )(Main);