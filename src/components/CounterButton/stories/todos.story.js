import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import CounterButton from '../CounterButton';

import './todos.style.css';

const TodoList = ({ todos, onToggle }) => (
  <div className="TodoList">
    {todos.map(todo => (
      <label key={todo} className="Todo" htmlFor={todo}>
        <input
          id={todo}
          onChange={e => onToggle(e.target.checked)}
          type="checkbox"
        />
        <span className="Todo-text">{todo}</span>
      </label>
    ))}
  </div>
);

const todos = [
  'Pick apples and make something scrumptious with them',
  'Drink pumpkin flavored beverages such as pumpkin ale or beer',
  'Have a campfire or bonfire and make S’mores',
  'Visit a Pumpkin Patch',
  'Decorate a Haunted Gingerbread House',
  'Give someone a friendly scare!'
];

class Todos extends Component {
  state = {
    counter: 0
  };

  handleToggle = checked => {
    this.setState(state => ({ counter: state.counter + (checked ? 1 : -1) }));
  };

  render() {
    const { counter } = this.state;
    return (
      <div style={{ padding: '2em' }}>
        <h3>
          <span>Halloween Checklist </span>
          <span role="img" aria-labelledby="spooky halloween theme">
            👻 🎃
          </span>
        </h3>
        <TodoList todos={todos} onToggle={this.handleToggle} />
        <div
          style={{
            marginTop: '1em',
            transition: 'all ease 0.1s',
            opacity: counter > 0 ? 1 : 0
          }}
        >
          <CounterButton count={counter === 0 ? '' : counter}>
            Archive
          </CounterButton>
        </div>
      </div>
    );
  }
}

storiesOf('CounterButton', module).add('Todo List', () => <Todos />, {
  notes:
    'Toggle todo-list items to show a counter action button at the bottom of ' +
    'the list with the number of items selected.'
});
