import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';

import { Segment } from 'semantic-ui-react';

import Groups from './groups';
import Channels from './channels';
import Messages from './messages';

class Main extends Component {
  componentDidMount() {
    this.props.fetchProfile(window.myUser);
  }

  render() {
    return (
    <div>
      <h1>Welcome to Connect, {window.myUser.display}</h1>
      <Segment.Group horizontal>
        <Segment><Groups /></Segment>
        <Segment><Channels /></Segment>
        <Segment><Messages /></Segment>
      </Segment.Group>
    </div>
    );
  }  
}

export default connect(null, { fetchProfile} )(Main);