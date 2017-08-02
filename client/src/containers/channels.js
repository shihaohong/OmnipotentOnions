import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchOneGroup } from '../actions';
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

  handleItemClick(e, { name }) {
    this.setState({activeItem: name});
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      this.props.socket.emit('subscribe', channel.id);
      return (
        <Menu.Item 
          key={channel.id}
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

export default connect(mapStateToProps, { fetchChannels, fetchOneGroup })(Channels);
