import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

import { Segment } from 'semantic-ui-react';

class Groups extends Component { 
  // constructor(props) {
  //   super(props);
  //   this.props.fetchGroups(this.props.profile);
  // }
  componentWillMount() {
    this.props.fetchGroups(this.props.profile);    
  }
  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Segment key={group.id}>
          <div> {group.groups.name} </div>
        </Segment>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Groups</h2>
        <Segment.Group>
          {this.renderGroups()}
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);