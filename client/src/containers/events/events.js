import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import _ from 'lodash';
// import {} from '../../actions';
import Details from './eventDetails';
import CreateEvent from './createEvent';

class Events extends Component {
  constructor(props) {
    super(props);
  }

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Segment key={group.id}>
          <button value={group.id} onClick={this.props.groupEvents}>
            {group.groups.name}
          </button>
        </Segment>
      );
    });
  }

  render () {
    return (
      <div>
        <h2>Groups</h2>
        <Segment.Group>
          {this.renderGroups()}
          <button onClick={this.props.showGroups}>          
            <Icon name='comments outline' size='big'/>
          </button>
        </Segment.Group>
      </div>
    );
  }


}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, null)(Events);