import * as actions from '../src/actions/index.js';
  
describe('actions', () => {
  it('should create a message', () => {
    const data = {
      id: 5,
      user: 'Shi-Hao',
      text: 'hello'
    };

    const expectedAction = {
      type: actions.CREATE_MESSAGE,
      payload: data
    };

    expect(actions.createMessage(data)).toEqual(expectedAction);
  });
});