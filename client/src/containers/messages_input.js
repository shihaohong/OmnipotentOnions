import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';
import axios from 'axios';

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

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field 
            placeholder='Please enter your message here'
            name='message'
            component={this.renderField}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
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

