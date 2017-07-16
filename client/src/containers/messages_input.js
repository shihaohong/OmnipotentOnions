import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';

class MessageInput extends Component {

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
    this.props.createMessage(message);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>Message Input</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label='Please enter your message here'
            name='message'
            component={this.renderField}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'MessageForm'
})(
  connect(null, { createMessage })(MessageInput)
);