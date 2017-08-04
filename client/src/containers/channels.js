import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchOneGroup, fetchGroups } from '../actions';
import _ from 'lodash';

import NewChannel from './new_channel';
import ChannelList from './channelList';

import { Icon, Menu } from 'semantic-ui-react';


export class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      activeItem: this.props.channelName
    });
  }

  handleItemClick(e, {name}) {
    console.log(e);
    this.setState({activeItem: name});
  }

  //creates a list of all channels

  renderChannels() {
    console.log('CHANNELS: ', this.props.channels);
    return _.map(this.props.channels, channel => {
      this.props.socket.emit('subscribe', channel.id);
      return (
        <Menu.Item 
          key={channel.id}
          active={this.state.activeItem === channel.name}
          value={channel.id}
          name={channel.name}
          onClick={(e, d) => {
            this.handleItemClick(e, d),
            this.props.handleMessage(e, d); 
          }}
        >
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
        </Menu.Menu>
        <NewChannel groupId={this.props.groupId}/>
      </Menu.Item>
    );
  }
}

const mapStateToProps = function(state) {
  return { channels: state.channels, oneGroup: state.oneGroup };
};

export default connect(mapStateToProps, { fetchChannels, fetchOneGroup, fetchGroups })(Channels);
