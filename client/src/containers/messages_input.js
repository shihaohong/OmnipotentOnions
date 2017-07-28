import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';

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
      channel_id: this.props.channelId,
      profile_id: this.props.profile.id,
      text: data.message
    }; 
    data.message = '';
    // Add display name & the client time, since they're available here.
    message['profile'] = { display: this.props.profile.display};
    message['fake_time'] = Date.now();
    this.props.socket.emit('send', message);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h4>Message Input</h4>
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

