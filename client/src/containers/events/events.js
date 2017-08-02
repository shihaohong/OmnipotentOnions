import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Segment, Menu } from 'semantic-ui-react';
import _ from 'lodash';
// import {} from '../../actions';
import Details from './eventDetails';
import CreateEvent from './createEvent';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
    };
  }
  handleItemClick(e, {name}) {
    console.log('name: ', {name});
    this.setState({activeItem: name});
  }

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Menu.Item 
          key={group.id}
          name={group.groups.name}
          active={this.state.activeItem === group.groups.name} 
          value={group.id}
          onClick={ (e, d) => { 
            this.handleItemClick(e, d);
            this.props.handleEventsDisplay(d.value); 
          }}
        >
          {group.groups.name}
        </Menu.Item>
      );
    });
  }


  render () {
    return (
      <Menu.Item>
        <Menu.Header>
          Groups
          <Icon 
            className='events' 
            inverted color='teal' 
            name='comments outline'
            onClick={this.props.handleEvents} 
          />
        </Menu.Header>
        <Menu.Menu>
          {this.renderGroups()}
        </Menu.Menu>
      </Menu.Item>
    );
  }


}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, null)(Events);