import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchEvents } from '../../actions';
import CreateEvent from './createEvent';
import _ from 'lodash';

import { Segment, Icon, Modal, Button } from 'semantic-ui-react';

export class GroupEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.props.fetchEvents(this.props.groupId);

    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleEventClick(eventId) {
    this.props.handleEventDetails(eventId);
  }

  handleOpen() { 
    this.setState({
      modalOpen: true,
    });
  }

  handleClose() { 
    this.setState({
      modalOpen: false,
    });
  }

  renderEvents() {
    return _.map(this.props.events, event => {
      return (
        <Segment key={event.id}>
          <Button onClick={ () => { this.handleEventClick(event.id); } }>
            {event.eventName}
          </Button>
        </Segment>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderEvents()}
        <Modal
          trigger={<Button onClick={this.handleOpen}><Icon name='plus circle' size='small'/></Button>}
          size='large'
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon='close'
        >
          <CreateEvent groupId={this.props.groupId} handleClose={this.handleClose}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, { fetchEvents })(GroupEvents);
