import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createChannel } from '../actions';

import shortid from 'shortid';

class NewChannel extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <input type='text' {...field.input}/>
      </div>
    );
  }

  onCreateChannel(e) {
    let newChannel = {
      name: e.channelName,
      group_id: this.props.groupId
    };
    let shortID = shortid.generate();
    e.channelName = '';
    this.props.createChannel(newChannel, shortID);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onCreateChannel.bind(this))}>
          <Field
            name='channelName'
            component={this.renderField}
          />
          <button type='submit'>Create Channel</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channelName: state.channelName
  };
};

export default reduxForm({
  form: 'ChannelsForm'
})( connect(mapStateToProps, { createChannel })(NewChannel) );
