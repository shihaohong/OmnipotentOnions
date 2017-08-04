import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createChannel } from '../actions';

import shortid from 'shortid';

import { Form, Icon, Menu } from 'semantic-ui-react';

class NewChannel extends Component {
  renderField(field) {
    // console.log('Field: ', field);
    const { meta: { touched, error, warning }} = field; 
    return (
      <Form.Input 
        className='inputForm' 
        transparent={true} 
        size='large'
        placeholder='enter new channel name'
        type='text' {...field.input}
      />
    );
  } 

  required(value) {
    return value ? undefined : <p>Required</p>;
  }


  onCreateChannel(e) {
    console.log(this.props.groupId);
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
      <Form inverted={true} onSubmit={handleSubmit(this.onCreateChannel.bind(this)) }>        
        <Field name="channelName" component={ this.renderField } validate={[this.required]}/>
        <Form.Button className='formButton' type='submit' color='teal' size='mini'>
          New Channel 
        </Form.Button>
      </Form>
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
