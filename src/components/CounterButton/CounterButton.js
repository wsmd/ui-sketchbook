import React, { Component, createRef } from 'react';
import classNames from 'classnames';

import './CounterButton.css';

const INCREMENT = 'inc';
const DECREMENT = 'dec';
const NUMERIC_PROPERTIES = ['margin-left', 'animation-duration'];

function getComputedProperty(node, property) {
  const value = window.getComputedStyle(node)[property];
  if (NUMERIC_PROPERTIES.includes(property)) {
    return parseFloat(value);
  }
  return value;
}

class CounterButton extends Component {
  state = {
    count: this.props.count,
    next: this.props.count,
    prev: this.props.count,
    animationState: null,
    width: null
  };

  updateQueue = [];

  buttonRef = createRef();

  counterRef = createRef();

  currentCountRef = createRef();

  nextCountRef = createRef();

  prevCountRef = createRef();

  componentDidMount() {
    this.animationDuration =
      getComputedProperty(this.currentCountRef.current, 'animation-duration') *
      1000;
    this.setState({ width: this.getInitialWidth() });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.animationState === null) {
      this.animateNumber(nextProps.count);
    } else {
      this.updateQueue.push(nextProps.count);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    clearTimeout(this.timeout);
    if (
      prevState.animationState !== null &&
      this.state.animationState === null
    ) {
      this.timeout = setTimeout(this.handleDeferredItems, 25);
    }
  }

  getWidth(countNode) {
    const totalWidth = this.buttonRef.current.getBoundingClientRect().width;
    const currentCountWidth = this.currentCountRef.current.getBoundingClientRect()
      .width;
    const nextCountWidth = countNode.getBoundingClientRect().width;
    return totalWidth - currentCountWidth + nextCountWidth;
  }

  getInitialWidth() {
    const margin = getComputedProperty(this.counterRef.current, 'margin-left');
    const initial = this.buttonRef.current.getBoundingClientRect().width;
    const current = this.currentCountRef.current.getBoundingClientRect().width;
    return initial + margin + current;
  }

  handleDeferredItems = () => {
    if (this.updateQueue.length > 0) {
      const lastDeferredNumber = this.updateQueue.pop();
      if (lastDeferredNumber !== this.state.count) {
        this.animateNumber(lastDeferredNumber);
      }
      this.updateQueue = [];
    }
  };

  updateCurrentCount(number) {
    setTimeout(() => {
      this.setState({ count: number, animationState: null });
    }, this.animationDuration);
  }

  animateNumber(nextCount) {
    const incrementing = nextCount > this.state.count;
    const animationState = incrementing ? INCREMENT : DECREMENT;
    const nextCountKey = incrementing ? 'next' : 'prev';
    const nextCountRef = incrementing ? this.nextCountRef : this.prevCountRef;
    // update the next/prev count node and start animations
    this.setState({ animationState, [nextCountKey]: nextCount }, () => {
      // update the button width
      this.setState({ width: this.getWidth(nextCountRef.current) }, () =>
        // update the current count
        this.updateCurrentCount(nextCount)
      );
    });
  }

  render() {
    const { width, next, count, prev, animationState } = this.state;
    return (
      <button
        type="button"
        ref={this.buttonRef}
        style={{ width }}
        className={classNames('CounterButton', {
          'is-incrementing': animationState === INCREMENT,
          'is-decrementing': animationState === DECREMENT
        })}
      >
        {this.props.children}
        <div className="CounterButton-counter" ref={this.counterRef}>
          <span
            ref={this.nextCountRef}
            className="CounterButton-count CounterButton-count--next"
          >
            {next}
          </span>
          <span
            ref={this.currentCountRef}
            className="CounterButton-count CounterButton-count--active"
          >
            {count}
          </span>
          <span
            ref={this.prevCountRef}
            className="CounterButton-count CounterButton-count--prev"
          >
            {prev}
          </span>
        </div>
      </button>
    );
  }
}

export default CounterButton;
