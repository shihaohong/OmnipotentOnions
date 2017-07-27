import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';

import { Segment, Icon } from 'semantic-ui-react';

export class EventDetails extends Component {
  constructor(props) {
    super(props);
    console.log('event details rendered. event id: ', this.props.eventId);
  }

  render() {
    let currentEvent = this.props.events[this.props.eventId];
    console.log('current event! ', currentEvent );
    return (
      <div> 
        Name: {currentEvent.name} <br/>
        Date: {currentEvent.date} <br/>
        Address: {currentEvent.address} <br/>
        Time: {currentEvent.time} <br/>
      </div>
    );
  } 

}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, {})(EventDetails);