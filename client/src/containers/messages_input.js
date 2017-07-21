import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';

export class MessageInput extends Component {

  constructor(props) {
    super(props);
    console.log('container/messages_input channel: ', this.props.channel);
    console.log('container/messages_input profile: ', this.props.profile);
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

  onSubmit(message) {
    // currently only sends { message: 'the message' }
    const postMessage = {
      channel_id: 5,
      profile_id: 'Shi-Hao',
      text: message.message
    };
 
    this.props.socket.emit('send', data);
    // this.props.createMessage(data);
    // clear data after message send
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