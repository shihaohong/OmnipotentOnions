import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchChannels, fetchMessages, fetchEvents, fetchGroups } from '../actions';

import { Segment, Menu, Header, Image } from 'semantic-ui-react';

import Groups from './groups';
import Channels from './channels';
import Messages from './messages';

import Events from './events/events';
import CreateEvent from './events/createEvent';
import EventDetails from './events/eventDetails';
import GroupEvents from './events/groupEvents';

import io from 'socket.io-client';
const socket = io();

//The main page that renders the channels and groups on the sidebar
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMain: true,
      groupId: null,
      channelId: null,
      showCreateEvents: false,
      showEventDetails: false
    };

    this.onHandleChannel = this.onHandleChannel.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleEvents = this.onHandleEvents.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);    
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.onDisplayEvents = this.onDisplayEvents.bind(this);
    this.handleEventDetails = this.handleEventDetails.bind(this);
  }

  //Once sign on, your information is fetched
  //as we go around the site, this information will be passed to load contents specific for each user
  componentWillMount() {
    this.props.fetchProfile(window.myUser);
    this.props.fetchGroups(window.myUser)
      .then((groups) => {
        this.props.fetchChannels(groups.payload.data[0].group_id)
          .then((channels) => {
            this.props.fetchMessages(channels.payload.data[0].id);
            this.setState({
              groupId: groups.payload.data[0].group_id,
              channelId: channels.payload.data[0].id
            });
          });
      });
  }

  onHandleChannel (e) {
    this.props.fetchChannels(e.value);
    this.setState({
      groupId: e.value,
    });
    console.log(this.props);
  }

  onHandleMessage(e, d) {
    console.log(d.value);
    this.props.fetchMessages(d.value);
    this.setState({
      channelId: d.value,
    });
  }

  onHandleEvents() { 
    this.setState({
      showMain: !this.state.showMain
    });
  }

  handleDeleteGroup() {
    this.setState({
      groupId: undefined,
      channelId: undefined
    });
  }

  handleCreateEvent(e) {
    // need edge cases
    this.setState({
      showCreateEvents: !this.state.showCreateEvents,
      groupId: e.target.value
    });

  }

  onHandleEvents() {
    this.setState({ 
      showMain: !this.state.showMain
    });
  }

  onDisplayEvents(groupId) {
    this.props.fetchEvents(groupId);
    this.setState({
      groupId: groupId
    });
  }

  handleEventDetails(eventId) {    
    this.setState({
      showEventDetails: !this.state.showEventDetails,
      eventId: eventId
    });
  }

  renderEventDetails() {
    if (this.state.eventId) {
      return ( 
        <EventDetails 
          key={this.state.eventId}
          eventId={this.state.eventId}
        />
      );
    } else {
      return (
        <div>
          Please select an event
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <Menu inverted vertical id='sidebar'>
          <Menu.Item>
            <Header as='h4' className='ui grey text'>
              <Image shape='circular' src={window.myUser.profilePic}/>
              {' '} {window.myUser.display}
            </Header>
          </Menu.Item> 
          {
            this.state.showMain ? 
              <Groups 
                profile={window.myUser} 
                handleChannel={this.onHandleChannel}
                handleEvents={this.onHandleEvents}
              /> 
              :
              <Events 
                handleEventsDisplay={this.onDisplayEvents}
                handleEvents={this.onHandleEvents}
              />
          }
          {
            this.state.showMain ? 
              <Channels 
                socket={socket} 
                profile={window.myUser}
                groupId={this.state.groupId} 
                handleMessage={this.onHandleMessage}
              /> 
              :
              <GroupEvents 
                groupId={this.state.groupId} 
                handleEventDetails={this.handleEventDetails}
              />
          }
          
        </Menu>
        <div id='main'>
          {
            this.state.showMain ? 
              <Messages 
                socket={socket} 
                channelId={this.state.channelId}
                profile={window.myUser}
              /> 
              : 
              this.renderEventDetails()
          }
        </div>
      </div>
    );
  }  
}

export default connect(null, { fetchProfile, fetchEvents, fetchChannels, fetchMessages, fetchGroups} )(Main);
