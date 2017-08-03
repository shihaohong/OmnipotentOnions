import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';
import axios from 'axios';

import { Header, Segment, Icon, Container} from 'semantic-ui-react';

export class EventDetails extends Component {
  constructor(props) {
    super(props);

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
          axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&units=metric&cnt=16&APPID=300dbc7cef6e1d88d172735c5f3cb721`)
            .then(result => {
              this.setState({
                isWeatherInformationAvailable: true,
                weatherInformation: result.data.list[diffDays],
                tooLate: false
              });
            });
        } else {
          let waitTime = diffDays - 15;
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
      if (!this.state.tooLate) {
        let weather = this.state.weatherInformation;
        console.log('WEAETHER(((( ', weather);
        let icon = weather.weather[0].icon;
        let url = `https://openweathermap.org/img/w/${icon}.png`;
        
        return (
          <div className='event-detail-font'>
            <b>Weather description:</b> {weather.weather[0].description} <br />
            <img className='weather-icon' src={url}/> <br/>
            <p className='weather-max-temp'>{Math.ceil(weather.temp.max)} °C </p> | {Math.ceil(weather.temp.min)} °C<br/>
            
            <br />

            <div className='weather-misc'>
              <strong>Pressure:</strong> {weather.pressure} hPa <br/>
              <strong>Wind speed:</strong> {weather.pressure} m/sec <br/>
              <strong>Cloudiness:</strong> {weather.clouds}% <br/>
              <strong>Humidity:</strong> {weather.humidity}% <br/>
            </div>
          </div>
        );
      } else {
        return <div>Please wait {this.state.weatherInformation.waitTime} days for weather information</div>;
      }
    } else {
      return <div>Weather information is unavailable</div>;
    }
  }

  renderDate(date) {
    const dateInfo = date.split('-');

    let months = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };

    let month = months[dateInfo[1]];

    return month + ' ' + dateInfo[2];
  }

  render() {
    let currentEvent = this.props.events[this.props.eventId];
    return (
      <Container> 
        <div id='dateIcon'>
          <div id='dateIconInner'>
            {this.renderDate(currentEvent.startDate)}
          </div>
        </div>

        <div className='event-header'>
          <br />
          <div className='event-title'>{currentEvent.eventName} </div>
          <div className='event-header-icon'>
            <Icon name='clock' size='large' color='grey'/>  
            {this.renderDate(currentEvent.startDate)} at {currentEvent.startTime} to {this.renderDate(currentEvent.endDate)} at {currentEvent.endTime}
            <br />
            <Icon name='marker' size='large' color='grey'/>  
            {currentEvent.location}
          </div> 
        </div>

        <div id='map-canvas'></div>
        <div className='event-weather'>
          <div className='event-detail-title'>Weather</div>
          {this.renderWeather()}
        </div>

        <div className='event-detail-title'>Event Description</div>
        <div className='event-detail-font'>
          {currentEvent.detail}
        </div>
      </Container>
    );
  } 

}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, {})(EventDetails);
