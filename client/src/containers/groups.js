import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import LeaveGroup from './leave_group';
import GroupList from './group_list';

import { Icon, Menu } from 'semantic-ui-react';

class Groups extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      showInvite: false,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(name) {
    console.log('NAME: ', name);
    this.setState({activeItem: name});
  }
  componentWillMount() {
    this.props.fetchGroups(this.props.profile);    
  }

  //functioned called immediately and will send over
  //group details, group id, and a function to switch channels

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <GroupList 
          group={group} 
          key={group.id} 
          handleChannel={this.props.handleChannel}
          handleItemClick={this.handleItemClick}
          activeItem={this.state.activeItem}
          handleDeleteGroup={this.props.handleDeleteGroup}
        />
      );
    });
  }

  //render the Group menu portion of the side bar
  
  render() {
    return (
      <Menu.Item style={{paddingBottom: 40 + 'px'}}>
        <Menu.Header>
          Groups
          <Icon 
            className='events' 
            inverted color='teal' 
            name='calendar'
            onClick={this.props.handleEvents} 
          />
        </Menu.Header>
          
        <Menu.Menu>
        {this.renderGroups()}
        </Menu.Menu>

        <NewGroup profile={this.props.profile}/>
        <JoinGroup profile={this.props.profile}/>
      </Menu.Item>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);
//         <button onClick={this.props.handleChannel} value={group.group_id}>  </button>
// <div>
//   <h2>Groups</h2>
//   <Segment.Group>
//     {this.renderGroups()}
//     <NewGroup profile={this.props.profile}/>
//     <JoinGroup profile={this.props.profile}/>
//     <button onClick={this.props.showEvents}>
//       <Icon name='calendar' size='big' />          
//     </button>
//   </Segment.Group>
// </div>