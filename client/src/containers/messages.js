import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions';
import MessageBoard from '../components/messages_board';
import MessageInput from './messages_input';

import { Segment } from 'semantic-ui-react';

class Messages extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    return (
      <div> 
        <h2> Messages </h2>
        <Segment.Group>
          <Segment>
            <MessageBoard 
              messages={this.props.messages}
            />
          </Segment>
          <Segment>
            <MessageInput/>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { messages: state.messages };
};

export default connect(mapStateToProps, { fetchMessages })(Messages);