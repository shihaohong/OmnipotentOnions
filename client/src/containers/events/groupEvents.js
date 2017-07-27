import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';

import { Segment, Icon } from 'semantic-ui-react';

export class GroupEvents extends Component {
  constructor(props) {
    super(props);
  }

  renderEvents() {
    // map over events
  }

  render() {
    return (
      <div>
        <button>
          <Icon name='plus circle' size='big'/>        
        </button>
      </div>
    );
  }

}

const mapStateToProps = function(state) {
  return {};
};

export default connect(mapStateToProps, {})(GroupEvents);