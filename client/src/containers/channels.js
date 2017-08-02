import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchOneGroup } from '../actions';
import _ from 'lodash';

import NewChannel from './new_channel';

import { Icon, Menu, Input } from 'semantic-ui-react';

export class Channels extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //   this.props.fetchOneGroup(this.props.groupId);
  // }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      console.log('YO CHANNEL!: ', channel);
      this.props.socket.emit('subscribe', channel.id);
      return (
        <Menu.Item key={channel.id} onClick={this.props.handleMessage}>
          {channel.name}
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <Menu.Item>
        <Menu.Header>
          Channels
        </Menu.Header>
        <Menu.Menu>
          {this.renderChannels()}
          <NewChannel groupId={this.props.groupId}/>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}

const mapStateToProps = function(state) {
  return { channels: state.channels, oneGroup: state.oneGroup };
};

export default connect(mapStateToProps, { fetchChannels, fetchOneGroup })(Channels);
