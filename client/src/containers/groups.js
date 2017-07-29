import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import LeaveGroup from './leave_group';

import { Segment, Icon } from 'semantic-ui-react';

class Groups extends Component { 
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchGroups(this.props.profile);    
  }

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Segment key={group.id}>
          <button onClick={this.props.handleChannel} value={group.id}> {group.groups.name} </button>
          <InviteLink group={group.groups} profile={this.props.profile}/>
          <LeaveGroup group={group}/>
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
          <NewGroup profile={this.props.profile}/>
          <JoinGroup profile={this.props.profile}/>
          <button onClick={this.props.showEvents}>
            <Icon name='calendar' size='big' />          
          </button>
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);