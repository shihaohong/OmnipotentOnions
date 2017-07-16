import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
class Channels extends Component {
  componentDidMount() {
    this.props.fetchChannels();
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      return (
        <div key={channel.id}>
          <h3> {channel.name} </h3>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Channels List</h1>
        {this.renderChannels()}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { channels: state.channels };
};

export default connect(mapStateToProps, { fetchChannels })(Channels);