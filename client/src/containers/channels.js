import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

export class Channels extends Component {
  componentWillMount() {
    this.props.fetchChannels(1);
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      return (
        <Segment key={channel.id}>
          <div> 
            {channel.name} 
          </div>
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
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { channels: state.channels };
};

export default connect(mapStateToProps, { fetchChannels })(Channels);