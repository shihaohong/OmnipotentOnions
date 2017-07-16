import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

class Groups extends Component { 

  componentDidMount() {
    this.props.fetchGroups();
  }

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <div key={group.id}> 
          <h3> Group {group.id} </h3>
          <div> {group.name} </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Groups List</h1>
        {this.renderGroups()}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);