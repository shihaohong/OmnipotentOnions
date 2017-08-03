import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';
import axios from 'axios';
import { Segment, Form } from 'semantic-ui-react';

var moment = require('moment');

export class MessageInput extends Component {
  constructor(props) {
    super(props);
  }

  renderField(field) {
    const { meta: { touched, error } } = field; 

    return (
      <div className='message'>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  onSubmit(data) {
    if (data.message !== '' ) {
      var message = {
        text: data.message,
        profile_id: this.props.profile.id,
        channel_id: this.props.channelId
      };
      data.message = '';
      axios.post(`/messages/${message.text}?channel_id=${message.channel_id}&profile_id=${message.profile_id}`);
      // Add display name & the client time, since they're available here.
      message['profile'] = this.props.profile;
      message['create_at'] = moment().toISOString();
      this.props.socket.emit('send', message);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    var disableField = !this.props.channelId;
    return disableField ? null : (
      <Segment inverted>
        <Form className='chat-text-entry' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field 
            placeholder="Enter your message here"
            name='message'
            component={this.renderField}
          />
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channel: state.channels,
    profile: state.profile,
  };
};

export default reduxForm({
  form: 'MessageForm'
})(
  connect(mapStateToProps, { createMessage })(MessageInput)
);

