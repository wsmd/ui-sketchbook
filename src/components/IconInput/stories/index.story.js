import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import classNames from 'classnames';
import { UserPlus } from 'react-feather';
import IconInput from '../IconInput';

import './index.style.scss';

const Wrapper = ({ children, leftAligned }) => (
  <div className="FullScreen">
    <div
      className={classNames(
        'FullScreen-content',
        leftAligned && 'FullScreen-content--leftAligned'
      )}
    >
      {children}
    </div>
  </div>
);

class Example extends Component {
  state = {
    loading: false,
    success: false,
    error: false
  };

  handleSubmit = () => {
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        this.setState({
          loading: false,
          [this.props.error ? 'error' : 'success']: true
        });
      }, 750);
    });
  };

  render() {
    return (
      <Wrapper leftAligned={this.props.leftAligned}>
        <IconInput
          onSubmit={this.handleSubmit}
          loading={this.state.loading}
          success={this.state.success}
          error={this.state.error}
          placeholder="Add New User"
        >
          <UserPlus />
        </IconInput>
      </Wrapper>
    );
  }
}

storiesOf('IconInput', module)
  .add('Success State', () => <Example />, {
    notes:
      'Click or focus the icon to transition into a text input. Type something' +
      'and hit the enter key to submit.'
  })
  .add('Error State', () => <Example error />, {
    notes:
      'Click or focus the icon to transition into a text input. Type something' +
      'and hit the enter key to submit.'
  })
  .add('Fixed Position (Left)', () => <Example leftAligned />, {
    notes:
      'Click or focus the icon to transition into a text input. Type something' +
      'and hit the enter key to submit.'
  });
