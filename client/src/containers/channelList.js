import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchOneGroup } from '../actions';
import _ from 'lodash';

import NewChannel from './new_channel';

import { Icon, Menu, Input } from 'semantic-ui-react';

export class ChannelList extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //   this.props.fetchOneGroup(this.props.groupId);
  // }

  // renderChannels() {
  //   return _.map(this.props.channels, channel => {
  //     this.props.socket.emit('subscribe', channel.id);
  //     return (
  //       <Menu.Item key={channel.id}
  //                  name={channel.name}
  //                  active={this.state.activeItem === channel.name} 
  //                  onClick={(e, d) => {
  //                    console.log('yOOOOOOOO'),
  //                    this.handleItemClick(e, d),
  //                    this.props.handleMessage; 
  //                  }}>
  //         {channel.name}
  //       </Menu.Item>
  //     );
  //   });
  // }

  // render() {
  //   return (
  //     <Menu.Item
  //       key={this.props.channel.id}
  //       name={this.props.channel.name}
  //       active={this.props.activeItem === this.props.channel.name}
  //       value={this.props.channel.id}
  //       onClick={(e, d) => { this.props.handleItemClick(e, d), this.props.handleMessage(d.value); }}
  //     >
  //       {this.props.channel.name}
  //     </Menu.Item>
  //   );
  // }
}

const mapStateToProps = function(state) {
  return { channels: state.channels, oneGroup: state.oneGroup };
};

export default connect(mapStateToProps, { fetchChannels, fetchOneGroup })(ChannelList);
