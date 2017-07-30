import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchOneGroup } from '../actions';
import _ from 'lodash';

import NewChannel from './new_channel';

import { Segment } from 'semantic-ui-react';

export class Channels extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchOneGroup(this.props.groupId);
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      this.props.socket.emit('subscribe', channel.id);
      return (
        <Segment key={channel.id}>
          <button value={channel.id} onClick={this.props.handleMessage}>{channel.name}</button>
        </Segment>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Channels</h2>
        <Segment.Group>
          {this.renderChannels()}
          <NewChannel groupId={this.props.groupId}/>
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { channels: state.channels, oneGroup: state.oneGroup };
};

export default connect(mapStateToProps, { fetchChannels, fetchOneGroup })(Channels);
