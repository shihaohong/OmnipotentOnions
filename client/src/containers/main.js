import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchChannels, 
  fetchMessages, fetchEvents, emptyChannels, fetchGroups } from '../actions';

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
      channelName: null,
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
    console.log('im mounting');
    this.props.fetchProfile(window.myUser);
    this.props.fetchGroups(window.myUser)
      .then((groups) => {
        this.props.fetchChannels(groups.payload.data[0].group_id)
          .then((channels) => {
            this.props.fetchMessages(channels.payload.data[0].id);
            this.setState({
              groupId: groups.payload.data[0].group_id,
              channelId: channels.payload.data[0].id,
              channelName: channels.payload.data[0].name
            });
          });
      });
  }

  onHandleChannel (groupId) {
    console.log('handle channel ', groupId);
    this.props.fetchChannels(groupId);
    this.setState({
      groupId: groupId,
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
    this.props.emptyChannels();
  }

  handleCreateEvent(e) {
    // need edge cases
    this.setState({
      showCreateEvents: !this.state.showCreateEvents,
      groupId: e.target.value
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
        <Segment inverted>
          <Header inverted color='teal' size='large'> Please Select An Event </Header>
        </Segment>
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
                handleDeleteGroup={this.handleDeleteGroup}
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
                key={this.state.groupId}
                socket={socket} 
                profile={window.myUser}
                groupId={this.state.groupId} 
                handleMessage={this.onHandleMessage}
                channelName={this.state.channelName}
              /> 
              :
              <GroupEvents 
                groupId={this.state.groupId} 
                handleEventDetails={this.handleEventDetails}
              />
          }
          
        </Menu>
        <div id='sidebar-spacer'></div>
        <div id='main'>
          {
            this.state.showMain ? 
              <Messages 
                socket={socket} 
                channelId={this.state.channelId}
                profile={window.myUser}
              /> 
              : 
              <div>
                <div id='chat-bg-color'></div>
                {this.renderEventDetails()}
              </div>
          }
        </div>
      </div>
    );
  }  
}

export default connect(null, { fetchProfile, fetchEvents, fetchChannels, fetchMessages, emptyChannels, fetchGroups } )(Main);
