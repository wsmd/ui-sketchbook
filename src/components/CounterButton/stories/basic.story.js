import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import CounterButton from '../CounterButton';

class CounterButtonExample extends Component {
  state = {
    count: 10
  };

  static defaultProps = {
    min: 0,
    max: 2000
  };

  increment = number => {
    const { max } = this.props;
    this.setState(state => ({ count: Math.min(max, state.count + number) }));
  };

  decrement = number => {
    const { min } = this.props;
    this.setState(state => ({
      count: Math.max(min, state.count - number)
    }));
  };

  randomize = () => {
    const { min, max } = this.props;
    this.setState({ count: Math.floor(Math.random() * max) + min });
  };

  render() {
    const isMax = this.state.count >= this.props.max;
    const isMin = this.state.count <= this.props.min;
    return (
      <div>
        <CounterButton count={this.state.count}>Mark as Read</CounterButton>
        <hr />
        <button type="button" onClick={this.randomize}>
          Random
        </button>
        <button
          type="button"
          disabled={isMax}
          onClick={() => this.increment(10)}
        >
          Increment by 10
        </button>
        <button
          type="button"
          disabled={isMin}
          onClick={() => this.decrement(10)}
        >
          Decrement by 10
        </button>
      </div>
    );
  }
}

storiesOf('CounterButton', module).add(
  'Basic Usage',
  () => <CounterButtonExample />,
  {
    notes:
      'Counter Button basic usage. Try incrementing and decrementing the ' +
      'counter value or clicking the Random button.'
  }
);
