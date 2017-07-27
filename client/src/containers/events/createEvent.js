import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';

import { Segment, Icon } from 'semantic-ui-react';

export class CreateEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      
      </div>
    );
  }

}

const mapStateToProps = function(state) {
  return { };
};

export default connect(mapStateToProps, {})(CreateEvent);