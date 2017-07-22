import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
import _ from 'lodash';

import NewChannel from './new_channel';

import { Segment } from 'semantic-ui-react';

export class Channels extends Component {
  constructor(props) {
    super(props);
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      return (
        <Segment key={channel.id}>
          <button value={channel.id}> 
            {channel.name} 
          </button>
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
  return { channels: state.channels };
};

export default connect(mapStateToProps, { fetchChannels })(Channels);