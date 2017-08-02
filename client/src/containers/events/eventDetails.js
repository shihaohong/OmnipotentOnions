import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';
import axios from 'axios';

import { Header, Segment, Icon, Container} from 'semantic-ui-react';

export class EventDetails extends Component {
  constructor(props) {
    super(props);

    console.log('event', this.props.events[this.props.eventId]);

    this.getGeolocation();

    this.state = {
      isWeatherInformationAvailable: false,
      tooLate: true,
      weatherInformation: {}
    };
  }

  getGeolocation() {
    let address = this.props.events[this.props.eventId].location;
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        let lat = (results[0].geometry.location.lat()).toFixed(2);
        let lng = (results[0].geometry.location.lng()).toFixed(2);

        let eventDate = new Date(this.props.events[this.props.eventId].startDate);
        let currentDate = new Date();

        let timeDiff = eventDate.getTime() - currentDate.getTime();
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (diffDays < 16 && diffDays >= 0) {
          axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&units=metric&cnt=16&APPID=300dbc7cef6e1d88d172735c5f3cb721`)
            .then(result => {
              console.log('diffDays: ', diffDays);
              console.log('received weather data', result);

              this.setState({
                isWeatherInformationAvailable: true,
                weatherInformation: result.data.list[diffDays],
                tooLate: false
              });
            });
        } else {
          console.log('number of days: ', diffDays);
          let waitTime = diffDays - 15;
          console.log('waitTime: ', waitTime);
          this.setState({
            isWeatherInformationAvailable: true,
            tooLate: true,
            weatherInformation: {
              waitTime: waitTime
            }
          });
        }

      } else {
        this.setState({
          isWeatherInformationAvailable: false,
          weatherInformation: {},
          tooLate: true
        });
      }
    });    
  }

  componentDidMount() {
    this.renderMaps();
  }

  renderMaps() {
    let map, marker;
    let address = this.props.events[this.props.eventId].location;
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
        alert('Geocoding was unsuccessful. There will not be a GMap displayed: ', status);
      }
    });
  }

  renderWeather() {
    if (this.state.isWeatherInformationAvailable) {
      console.log('info is available', this.state.weatherInformation);
      if (!this.state.tooLate) {
        let weather = this.state.weatherInformation;
        return (
          <div>
            <strong>Temperature:</strong> <br/>
            Min: {weather.temp.min} °C <br/>
            Max: {weather.temp.max} °C <br/>
            <strong>Pressure:</strong> {weather.pressure} hPa <br/>
            <strong>Description:</strong> {weather.weather[0].description}

          </div>
        );
      } else {
        return <div>Please wait {this.state.weatherInformation.waitTime} days for weather information</div>;
      }
    } else {
      return <div>Weather information is unavailable</div>;
    }
  }

  renderDateIcon(date) {
    console.log('date: ', date);

    const dateInfo = date.split('-');

    console.log('date information: ', dateInfo);

    let months = {
      '01': 'JAN',
      '02': 'FEB',
      '03': 'MAR',
      '04': 'APR',
      '05': 'MAY',
      '06': 'JUN',
      '07': 'JUL',
      '08': 'AUG',
      '09': 'SEP',
      '10': 'OCT',
      '11': 'NOV',
      '12': 'DEC'
    };

    let month = months[dateInfo[1]];

    return (
      <div className='dateIcon'> 
        {month} <br/>
        {dateInfo[2]} <br/>
      </div>
    );
  }

  render() {
    let currentEvent = this.props.events[this.props.eventId];
    return (
      <Container> 
        {this.renderDateIcon(currentEvent.startDate)}
        <div className='event-header'>
          <Header as='h2'>{currentEvent.eventName} </Header>
          <div>
            <Icon name='clock' size='big'/> 
            <div> 
              {currentEvent.startDate} - {currentEvent.endDate} <br/>
              Next Line <br/>
            </div>
          </div>
        </div>
        
        <strong>Date:</strong> <br/>
        <strong>Location:</strong> {currentEvent.location} <br/>
        <div id='map-canvas'></div>
        <strong>Time:</strong> {currentEvent.startTime} - {currentEvent.endTime} <br/>
        <div>
          <strong>Weather</strong> <br/> 
          {this.renderWeather()}
        </div> 
      </Container>
    );
  } 

}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, {})(EventDetails);