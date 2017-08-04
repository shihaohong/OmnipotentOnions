import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, createEvent } from '../../actions';
import _ from 'lodash';

import { Segment, Icon, Button, Header, Image, Modal, Input, Dropdown } from 'semantic-ui-react';

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      detail: '',
    };

    this.time = [
      {key: '06:00', value: '06:00', text: '6:00 AM'},
      {key: '06:30', value: '06:30', text: '6:30 AM'},
      {key: '07:00', value: '07:00', text: '7:00 AM'},
      {key: '07:30', value: '07:30', text: '7:30 AM'},
      {key: '08:00', value: '08:00', text: '8:00 AM'},
      {key: '08:30', value: '08:30', text: '8:30 AM'},
      {key: '09:00', value: '09:00', text: '9:00 AM'},
      {key: '09:30', value: '09:30', text: '9:30 AM'},
      {key: '10:00', value: '10:00', text: '10:00 AM'},
      {key: '10:30', value: '10:30', text: '10:30 AM'},
      {key: '11:00', value: '11:00', text: '11:00 AM'},
      {key: '11:30', value: '11:30', text: '11:30 AM'},
      {key: '12:00', value: '12:00', text: '12:00 PM'},
      {key: '12:30', value: '12:30', text: '12:30 PM'},
      {key: '13:00', value: '13:00', text: '1:00 PM'}, 
      {key: '13:30', value: '13:30', text: '1:30 PM'},
      {key: '14:00', value: '14:00', text: '2:00 PM'},
      {key: '14:30', value: '14:30', text: '2:30 PM'},
      {key: '15:00', value: '15:00', text: '3:00 PM'},
      {key: '15:30', value: '15:30', text: '3:30 PM'},
      {key: '16:00', value: '16:00', text: '4:00 PM'},
      {key: '16:30', value: '16:30', text: '4:30 PM'},
      {key: '17:00', value: '17:00', text: '5:00 PM'},
      {key: '17:30', value: '17:30', text: '5:30 PM'},
      {key: '18:00', value: '18:00', text: '6:00 PM'},
      {key: '18:30', value: '18:30', text: '6:30 PM'},
      {key: '19:00', value: '19:00', text: '7:00 PM'},
      {key: '19:30', value: '19:30', text: '7:30 PM'},
      {key: '20:00', value: '20:00', text: '8:00 PM'},
      {key: '20:30', value: '20:30', text: '8:30 PM'},
      {key: '21:00', value: '21:00', text: '9:00 PM'},
      {key: '21:30', value: '21:30', text: '9:30 PM'},
      {key: '22:00', value: '22:00', text: '10:00 PM'},
      {key: '22:30', value: '22:30', text: '10:30 PM'},
      {key: '23:00', value: '23:00', text: '11:00 PM'},
      {key: '23:30', value: '23:30', text: '11:30 PM'},
      {key: '00:00', value: '00:00', text: '12:00 AM'}, 
      {key: '00:30', value: '00:30', text: '12:30 AM'},
      {key: '01:00', value: '01:00', text: '1:00 AM'},
      {key: '01:30', value: '01:30', text: '1:30 AM'},
      {key: '02:00', value: '02:00', text: '2:00 AM'},
      {key: '02:30', value: '02:30', text: '2:30 AM'},
      {key: '03:00', value: '03:00', text: '3:00 AM'},
      {key: '03:30', value: '03:30', text: '3:30 AM'},
      {key: '04:00', value: '04:00', text: '4:00 AM'},
      {key: '04:30', value: '04:30', text: '4:30 AM'},
      {key: '05:00', value: '05:00', text: '5:00 AM'},
      {key: '05:30', value: '05:30', text: '5:30 AM'}
    ];

    this.eventNameChange = this.eventNameChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.startTimeChange = this.startTimeChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.endTimeChange = this.endTimeChange.bind(this);
    this.detailChange = this.detailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  eventNameChange(e) {
    var eventName = e.target.value;
    this.setState({
      eventName: eventName
    });
  }
  locationChange(e) {
    var location = e.target.value;
    this.setState({
      location: location
    });
  }
  startDateChange(e) {
    var startDate = e.target.value;
    this.setState({
      startDate: startDate
    });
  }
  startTimeChange(data) {
    console.log(data.value);
    var startTime = data.value;
    this.setState({
      startTime: startTime
    });
  }

  endDateChange(e) {
    var endDate = e.target.value;
    this.setState({
      endDate: endDate
    });
  }

  endTimeChange(data) {
    var endTime = data.value;
    this.setState({
      endTime: endTime
    });
  }
  detailChange(e) {
    var detail = e.target.value;
    this.setState({
      detail: detail
    });
  }

  onSubmit(e) {
    console.log(this.props);
    var groupId = this.props.groupId;
    var body = {
      eventName: this.state.eventName,
      location: this.state.location,
      startDate: this.state.startDate,
      startTime: this.state.startTime,
      endDate: this.state.endDate,
      endTime: this.state.endTime,
      detail: this.state.detail,
      creator: this.props.profile.id
    };
    this.props.createEvent(body, groupId);
    console.log(this.props);
    this.props.handleClose();
    // this.props.createEvents();
  }

  render() {
    return (
      <Modal.Content>
        <div className = 'ui form'>
          <div className = 'field'>
            <label>Event Name</label>
            <Input className='required field' value={this.state.eventNameChange} onChange={this.eventNameChange}/>
          </div>
          <div className = 'field'>
            <label>Location</label> 
            <Input className='required field' value={this.state.locationChange} onChange={this.locationChange}/>
          </div>
        </div>
        <div className='field'>
          <b> Date/Time </b>
        </div>
        <div className="ui form">
          <Input className='required field' type='date' onChange={this.startDateChange} icon='calendar'/>
          <Dropdown placeholder='start time' search selection options={this.time} onChange={(e, data) => this.startTimeChange(data)}/>
          <Icon name= 'time'/> <label> Start</label>
        </div>
        <div className="ui form">
          <Input className='required field' type='date' onChange={this.endDateChange} icon='calendar'/>
          <Dropdown placeholder='end time' search selection options={this.time} onChange={(e, data) => this.endTimeChange(data)}/>
          <Icon name= 'time'/> <label> End</label>
        </div>
        <div className="ui form">
          <div className="field">
            <label>Details</label>
            <textarea className='required field' rows="3" onChange={this.detailChange}></textarea>
          </div>
        </div>
        <button className="ui teal button small" type="submit" onClick={this.onSubmit}>Submit</button>
      </Modal.Content>
    );
  }

}

const mapStateToProps = function(state) {
  return { profile: state.profile };
};

export default connect(mapStateToProps, {fetchChannels, createEvent})(CreateEvent);