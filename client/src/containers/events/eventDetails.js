import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';
// import geocoder from 'geocoder';

import { Segment, Icon } from 'semantic-ui-react';

export class EventDetails extends Component {
  constructor(props) {
    super(props);
    console.log('event details rendered. event id: ', this.props.eventId);
  }

  componentDidMount() {
    this.renderMaps();
  }

  renderMaps() {
    let map, marker;
    let address = this.props.events[this.props.eventId].address;
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        let mapOptions = {
          center: results[0].geometry.location,
          zoom: 15
        };
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        let marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('geocode unsuccessful: ', status);
      }
    });
  }

  render() {
    let currentEvent = this.props.events[this.props.eventId];
    console.log('current event! ', currentEvent );
    return (
      <div> 
        Name: {currentEvent.name} <br/>
        Date: {currentEvent.date} <br/>
        Address: {currentEvent.address} <br/>
        <div id='map-canvas'></div>
        Time: {currentEvent.time} <br/>
      </div>
    );
  } 

}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, {})(EventDetails);