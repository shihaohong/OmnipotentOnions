import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchChannels, fetchMessages } from '../actions';

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

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMain: true,
    };
    this.onHandleChannel = this.onHandleChannel.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleEvents = this.onHandleEvents.bind(this);
    this.onHandleGroups = this.onHandleGroups.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);    
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleGroupEvents = this.handleGroupEvents.bind(this);
    this.handleEventDetails = this.handleEventDetails.bind(this);
  }
  componentWillMount() {
    this.props.fetchProfile(window.myUser);    
  }

  onHandleChannel (e) {
    console.log('E TARGET VALUE: ', e.value);
    this.props.fetchChannels(e.value);
    this.setState({
      groupId: e.value,
    });
  }

  onHandleMessage(e, d) {
    console.log('DDDDDDDD: ', d.value);
    this.props.fetchMessages(d.value);
    this.setState({
      channelId: d.value
    });
  }

  onHandleEvents() {
    this.setState({
      showMain: !this.state.showMain
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

  handleGroupEvents(e) {
    // show Group Events and should have some actions
    // need edge cases
    // console.log('main handlegroup ', e.target.value);
    this.setState({
      showGroupEvents: !this.state.showGroupEvents,
      groupId: e.target.value
    });
  }

  handleEventDetails(eventId) {
    console.log('show event', this.state.showEventDetails);
    this.setState({
      showEventDetails: !this.state.showEventDetails,
      eventId: eventId
    });
  }
// "position: fixed; left: 0px; bottom: 0px; width: 50em;"
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
            <Groups profile={window.myUser} handleChannel={this.onHandleChannel} handleEvents={this.onHandleEvents}/> 
              :
            <Events showGroups={this.onHandleGroups} groupEvents={this.handleGroupEvents}
                handleEvents={this.onHandleEvents}/>
              
          }
          {
            this.state.showMain ? 
            <Channels socket={socket} groupId={this.state.groupId} handleMessage={this.onHandleMessage}/> 
              :
            <GroupEvents groupId={this.state.groupId} handleEventDetails={this.handleEventDetails}/>
          }
          
        </Menu>
        <div id='main'>
          {
            this.state.showMain ? <Messages socket={socket} channelId={this.state.channelId}/> : null
          }
        </div>
      </div>
    );
  }  
}
export default connect(null, { fetchProfile, fetchChannels, fetchMessages} )(Main);


//  const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
//   <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
// )
// const required = value => {
//   return value ? undefined  : <p> Required </p>
// };
// submit(values) {
//     console.log('values: ', values);
//   }
// //inbetween render and return 
// const { handleSubmit } = this.props;
// <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
//   <Field name="first_name" component={ renderTextField } validate={[required]} label="First Name" width={8}/>
//   <Button primary type="submit">Update</Button>
// </Form>
        // <h1>Welcome to Connect, {window.myUser.display}</h1>
        // <Segment.Group horizontal>
        //   {
        //     this.state.showGroups ? <Segment><Groups profile={window.myUser} handleChannel={this.onHandleChannel} showEvents={this.onHandleEvents}/></Segment> 
        //     : null
        //   }          
        //   {
        //     this.state.showChannel ? <Segment><Channels socket={socket} groupId={this.state.groupId} handleMessage={this.onHandleMessage}/></Segment> : null
        //   }
        //   {
        //     this.state.showMessages ? <Segment><Messages socket={socket} channelId={this.state.channelId}/></Segment> : null
        //   }


        //   {
        //     this.state.showEvents ? <Segment><Events showGroups={this.onHandleGroups} groupEvents={this.handleGroupEvents}/></Segment> : null
        //   }
        //   {
        //     this.state.showGroupEvents ? <Segment><GroupEvents groupId={this.state.groupId} handleEventDetails={this.handleEventDetails}/></Segment> : null
        //   }
        //   {
        //     this.state.showEventDetails ? <Segment><EventDetails eventId={this.state.eventId} /></Segment> : null
        //   }
        //   {
        //     this.state.showCreateEvents ? <Segment><CreateEvent showCreateEvents={this.handleCreateEvent} groupId={this.state.groupId}/></Segment> : null
        //   }
        // </Segment.Group>