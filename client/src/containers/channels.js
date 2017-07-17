import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';

import { Segment } from 'semantic-ui-react';

class Channels extends Component {
  componentDidMount() {
    this.props.fetchChannels();
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