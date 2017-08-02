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

  // componentWillMount() {
  //   this.props.fetchOneGroup(this.props.groupId);
  // }
  handleItemClick(e, { name }) {
    console.log('INSIDE HANDDDDDDDLE CLICK');
    this.setState({activeItem: name});
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      this.props.socket.emit('subscribe', channel.id);
      return (
        // <ChannelList channel={channel}
        //              key={channel.id}
        //              handleItemClick={this.handleItemClick}
        //              handleMessage={this.props.handleMessage}
        //              activeItem={this.state.activeItem}
        //              />
        <Menu.Item key={channel.id}
                   name={channel.name}
                   value={channel.id}
                   onClick={(e, d) => {
                     console.log('yOOOOOOOO'),
                     this.handleItemClick(e, d),
                     this.props.handleMessage(e, d); 
                   }}>
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
