import React, { Component } from 'react';
import classNames from 'classnames';

import './Item.scss';

const CheckIcon = () => (
  <svg
    viewBox="0 0 12 10"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <polygon points="3.83558954 6.50716242 10.4333903 0.0859164624 11.8282971 1.51917677 3.80688852 9.32593527 0 5.5 1.41421356 4.08578644" />
  </svg>
);

class Item extends Component {
  render() {
    const { children, style, short, selected, innerRef, ...props } = this.props;
    return (
      <div
        ref={innerRef}
        className={classNames(
          'Item',
          short && 'Item--short',
          selected && 'Item--selected'
        )}
        {...props}
      >
        {children}
        <div
          className={classNames('Check', selected && 'Check--selected')}
          {...props}
        >
          <CheckIcon />
        </div>
      </div>
    );
  }
}

export default Item;
